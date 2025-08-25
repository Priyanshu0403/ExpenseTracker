import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useStore from "@/store";
import { auth } from "@/lib/firebaseConfig";
import api from "@/lib/apiCall";
import { toast } from "sonner"; //Lets you trigger toast popups anywhere in your app.
import { Button } from "./ui/button";

export const SocialAuth = ({isLoading,setLoading})=>{
//npm install react-firebase-hooks
// import { useAuthState } from "react-firebase-hooks/auth";
    const {user} = useAuthState(auth);
    const[selectedProvider,setSelectedProvider] = useState("google");
    const {setCredentials} = useStore((state)=>state); //here destructuring of the elements in useStore is done to get setCredentials
    const navigate = useNavigate();

    const singInWithGoogle= async()=>{
        const provider = new GoogleAuthProvider();
        setSelectedProvider("google");
        try {
            const res = await signInWithPopup(auth,provider);
        } catch (error) {
            console.error("Error signing in with google",error);
            
        }
    }
    // const singInWithGithub= async()=>{
    //     
    // }

    useEffect(()=>{
        const saveUserToDb = async()=>{
            try {
                const userData ={
                    name:user.displayname,
                    email:user.email,
                    provider:selectedProvider,
                    uid:user.uid,
                };

                setLoading(true);
                //api call to backend at the path given 
                const {data: res} = await api.post("/auth/sign-in",userData);

                if(res?.user){
                    //toast is the object that lets you trigger small popup notifications (a.k.a. toasts) to show feedback to the user.
                    toast.success(res?.message);
                    const userInfo = {...res?.user,token: res?.token};
                    localStorage.setItem("user",JSON.stringify(userInfo));

                    setCredentials(userInfo);

                    setTimeout(()=>{
                        navigate("/overview");
                    },1500);
                }
            } catch (error) {
                console.error("Something went wrong:",error);
                toast.error(error.response?.data?.message || error.message);
            }finally{
                setLoading(false);
            }
        };


        if(user){
            saveUserToDb();
        }
    },[user?.uid]);
    return(
        <div className="flex items-center gap-2">
            <Button
                onClick={singInWithGoogle}
                disabled={isLoading}
                variant="outline"
                className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
                type="button"
            >
                <FcGoogle className="mr-2 size-5"/>
                Continue with Google
            </Button>

            {/* <Button
                // onClick={singInWithGithub}
                disabled={isLoading}
                variant="outline"
                className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
                type="button"
            >
                <FaGithub className="mr-2 size-4"/>
                Continue with Github
            </Button> */}
        </div>
    )
}
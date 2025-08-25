import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "@/store";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { SocialAuth } from "@/components/social-auth";
import { Separator } from "@/components/separator";
import { Input } from "@/components/ui/input";
import {BiLoader} from "react-icons/bi"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/apiCall";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Invalid Email address" }), //here email is a format to be checked for email inputs
  password: z
    .string({ required_error: "Password is Required" })
    .min(1, "Password is required"), //here the min is the format or method to check the password length to be atleast 1
});

const SignIn = () => {
  const { user,setCredentials } = useStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  //  if user exists in global store, redirects to /.
  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const onSubmit = async (data) => {
   try {
      setLoading(true);
      const{data:res} = await api.post("/auth/sign-in",data);
      if(res?.user){
        toast.success(res?.message);

        const userInfo = {...res?.user, token: res.token};

        localStorage.setItem("user",JSON.stringify(userInfo));

        setCredentials(userInfo);

        setTimeout(()=>{
          navigate("/overview")
        },1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message)
      
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[400px] bg-white dark-bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center dark:text-white">
              Sign In
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-8 space-y-6">
                <SocialAuth isLoading={loading} setLoading={setLoading} />
                <Separator /> 
                <Input
                  disabled={loading}
                  id="email"
                  label="Email"
                  // name="email"
                  type="email"
                  placeholder="yourname@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400
                  dark:outline-none"
                />
                <Input
                  disabled={loading}
                  id="password"
                  label="Password"
                  // name="password"
                  type="password"
                  placeholder="Your Password"
                  error={errors.password?.message}
                  {...register("password")}
                  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700 dark:text-gray-400
                  dark:outline-none"
                />
              </div>

              <Button
              type="submit"
              className="w-full bg-violet-800"
              disabled={loading}>
                {loading ? <BiLoader className="text-2xl text-white animate-spin"/> : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </div>

        <CardFooter className="justify-center gap-2">
          <p className="text-sm text-gray-600">Don't have an Account?</p>
          <Link 
          to="/sign-up"
          className="text-sm font-semibold text-violet-600 hover:underline">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;

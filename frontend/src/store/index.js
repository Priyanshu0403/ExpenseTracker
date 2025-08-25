import {create} from "zustand";

// global state store using zustand — a minimalist state management library for React.
const useStore =create((set)=>({
//     initializing two state values from localStorage:
// theme: either "light" or whatever is stored
// user: a parsed JSON user object (if exists), or null
    theme: localStorage.getItem("theme") ?? "light",
    user: JSON.parse(localStorage.getItem("user")) ?? null,
    
    //  defining three functions (aka actions) to modify state:
// setTheme(value) → updates theme
// setCredentials(user) → sets user object
// signOut() → clears user (sets it to null)
    setTheme: (value)=> set({theme:value}),
    setCredentials:(user)=>set({user}),
    signOut:()=>set({user:null}),
}));

export default useStore;
import React, { useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import {Avatar} from "../assets"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiCurrencyLine } from "react-icons/ri";
import ThemeSwitch from "./themeSwitch";

const links = ["Dashboard", "Transactions", "Accounts", "Settings"];

const Navbar = () => {
  const [selected, setSelected] = useState(0);

  
  return (
    // <nav
    //       className="fixed top-5 left-1/2 -translate-x-1/2 z-50 
    //                w-[92%] max-w-8xl h-20 px-6 flex items-center justify-between 
    //                rounded-xl shadow-lg border border-white/10 
    //                bg-blue/30 backdrop-blur-md transition-all duration-300"
    //       style={{
    //         borderBottom: "1px solid rgba(255,255,255,0.05)",
    //         background: "rgba( 20,60,120,0.5)",
    //         backdropFilter: "blur(14px)",
    //         WebkitBackdropFilter: "blur(14px)",
    //       }}
    //     ></nav>
    <div className="w-full flex items-center justify-between py-6">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-violet-700 rounded-xl">
          <HiOutlineCurrencyRupee className="text-white text-3xl hover:animate-spin" />
        </div>
        <span className="text-xl font-bold text-black dark:text-white">
          My-Finance
        </span>
      </div>
      <div className="hidden md:flex items-center gap-4 ">
        {links.map(
          (
            link,
            index //no need for the return for single statement
          ) => (
            <div
              key={index}
              className={`${
                index === selected
                  ? "bg-black dark:bg-slate-800 text-white"
                  : "text-gray-500 dark:text-gray-500"
              } px-6 py-2 rounded-full`}
              onClick={()=>{setSelected(index)}}
            >
              <a href="#">{link}</a>
            </div>
          )
        )}
      </div>

      <div className="flex items-center gap-10 2xl:gap-20">
        <ThemeSwitch/>
        <div className="flex items-center gap-2">
          <img src={Avatar} alt="user" className="w-12 h-10 md:h-12 rounded-full object-cover cursor-pointer"/>  
          <div className="hidden md:block">
            <p className="text-lg font-medium text-black dark:text-gray-400">Priyanshu</p>
            <span className="text-sm text-gray-700 dark:text-gray-500">priyanshusarvaiyya@gmail.com</span>
            <MdOutlineKeyboardArrowDown className="hidden md:block text-2xl text-gray-600 dark:text-gray-300 cursor-pointer"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

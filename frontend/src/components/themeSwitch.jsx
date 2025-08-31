import useStore from '@/store';
import React, { useState } from 'react'
import { LuSunMoon } from "react-icons/lu";
import { IoMoonOutline } from 'react-icons/io5';
import { BsFillMoonFill, BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const ThemeSwitch = () => {
    const{theme,setTheme} = useStore((state) => state);
    const[isDarkMode,setIsDarkMode]=useState(theme === "dark");

    const toggleTheme =()=>{
        const newTheme = isDarkMode? "light":"dark";
        setIsDarkMode(!isDarkMode);

        setTheme(newTheme);
        localStorage.setItem("theme",newTheme);
    }
  return (
    <button onClick={toggleTheme} className='outline-none'>
      {
        isDarkMode ? (
          <BsFillSunFill className='text-2xl text-gray-600 dark:text-gray-300 cursor-pointer'/>
        ) : (
          <BsFillMoonStarsFill className='text-2xl text-gray-600 dark:text-gray-300 cursor-pointer'/>
        )
      }
    </button>
    // <div className={`switch ${isDarkMode? "light":"dark"}`} onClick={toggleTheme}>
    //   <div className={`ball ${isDarkMode ? "dark":"light"}`}></div>
    // </div>
  )
}

export default ThemeSwitch

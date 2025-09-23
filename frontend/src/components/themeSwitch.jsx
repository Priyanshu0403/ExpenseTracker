import useStore from "@/store";
import React, { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useStore((state) => state);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      onClick={toggleTheme}
      className="relative w-11 h-5 bg-gray-800 dark:bg-gray-200 rounded-full cursor-pointer flex items-center justify-between px-1"
    >
      {/* Sun and Moon indicators */}
      <span className="text-yellow-400 flex items-center justify-center w-3 h-3 text-[0.85rem]">☀️</span>
      <span className="text-orange-400 flex items-center justify-center w-3 h-3 text-[0.85rem]">🌙</span>

      {/* Sliding ball */}
      <span
        className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full transition-transform duration-200 ${
          isDarkMode ? "translate-x-6 bg-black" : " bg-white"
        }`}
      ></span>
    </div>
  );
};

export default ThemeSwitch;




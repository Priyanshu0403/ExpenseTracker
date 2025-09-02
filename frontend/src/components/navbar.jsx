import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import { signOut } from "firebase/auth";
import React, { Fragment, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { Transition } from "@headlessui/react"; // Needed for animation

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

import TransitionWrapper from "./wrappers/transition-wrapper";
import { Avatar } from "../assets";
import { HiOutlineCurrencyRupee } from "react-icons/hi2"; 
import ThemeSwitch from "./themeSwitch";
import useStore from "@/store";
import { auth } from "../lib/firebaseConfig"; 



// Navigation links
const links = [
  { label: "Dashboard", link: "/overview" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/accounts" },
  { label: "Settings", link: "/settings" },
];

// ✅ UserMenu Component
const UserMenu = () => {
  const [user, setCredentials] = useStore((state) => [state.user, state.setCredentials]);
  const navigate = useNavigate();

  const handleSignout = async () => {
    if (user?.provider === "google") {
      await handleSocialLogout();
    }
    localStorage.removeItem("user");
    setCredentials(null);
    navigate("/sign-in");
  };

  const handleSocialLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Menu as="div" className="relative z-50">
      <MenuButton className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer 2xl:w-12 2xl:h-12 bg-violet-600">
          <p className="text-2xl font-bold">{user?.firstname?.charAt(0)}</p>
        </div>
        <MdOutlineKeyboardArrowDown className="hidden text-2xl text-gray-600 cursor-pointer md:block dark:text-gray-300" />
      </MenuButton>

      <TransitionWrapper>
        <MenuItems className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-slate-800 dark:divide-gray-700">
          {/* Profile Section */}
          <div className="p-2 md:p-5">
            <div className="flex w-full gap-3 mb-5">
              <div className="flex items-center justify-center text-white rounded-full cursor-pointer min-w-10 size-10 2xl:size-12 bg-violet-600">
                <p className="text-2xl font-bold">{user?.firstname?.charAt(0)}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-black dark:text-gray-200">
                  {user?.firstname}
                </p>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="py-2">
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-violet-500 text-white"
                      : "text-gray-700 dark:text-gray-200"
                  } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                >
                  Profile
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-violet-500 text-white"
                      : "text-gray-700 dark:text-gray-200"
                  } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                >
                  Settings
                </button>
              )}
            </MenuItem>
          </div>

          {/* Logout */}
          <div className="py-2">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleSignout}
                  className={`${
                    active
                      ? "bg-red-500 text-white"
                      : "text-red-600 dark:text-red-400"
                  } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </TransitionWrapper>
    </Menu>
  );
};


const MobileSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="md:hidden">
      <Popover className="relative">
        {({ open }) => (
          <>
            {/* Button */}
            <Popover.Button
              className="flex items-center rounded-md font-medium focus:outline-none text-gray-600 dark:text-gray-400"
            >
              {open ? (
                <MdOutlineClose size={26} />
              ) : (
                <IoIosMenu size={26} />
              )}
            </Popover.Button>

            {/* Transition Wrapper */}
            <Transition
              as={Fragment}
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-150 ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-2"
            >
              <Popover.Panel
                className="absolute z-50 w-screen max-w-sm px-4 py-6 mt-3 transform -translate-x-1/2 bg-white dark:bg-gray-900 left-1/2 rounded-2xl shadow-lg"
              >
                <div className="flex flex-col space-y-3">
                  {links.map(({ label, link }, index) => (
                    <Link
                      key={index}
                      to={link}
                      className={`px-4 py-2 rounded-lg font-medium text-sm 
                        ${
                          link === path
                            ? "bg-gray-200 dark:bg-gray-700 text-blue-600"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};


// ✅ Navbar Component
const Navbar = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full flex items-center justify-between py-6">
      {/* Logo Section */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-violet-700 rounded-xl">
          <HiOutlineCurrencyRupee className="text-white text-3xl hover:animate-spin" />
        </div>
        <span className="text-xl font-bold text-black dark:text-white">
          My-Finance
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4">
        {links.map((item, index) => (
          <div
            key={index}
            className={`${
              index === selected
                ? "bg-black dark:bg-slate-800 text-white"
                : "text-gray-500 dark:text-gray-500"
            } px-6 py-2 rounded-full cursor-pointer`}
            onClick={() => setSelected(index)}
          >
            <Link to={item.link}>{item.label}</Link>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 md:gap-10 2xl:gap-20">
        <ThemeSwitch />
        <UserMenu />
        {/* Show only on mobile */}
        <MobileSidebar />
      </div>
    </div>
  );
};


export default Navbar;

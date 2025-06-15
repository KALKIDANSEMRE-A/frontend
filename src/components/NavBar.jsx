import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  UsersIcon,
  Cog6ToothIcon,
  UserIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../context/UserContext";
import UserProfileMenu from "./UserProfileMenu";
import aauLogo from "../assets/aauLogo.png";

const NavBar = () => {
  const location = useLocation();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to check if the current path matches the link path
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-[#004165] text-white py-4">
        <div className="w-full px-4 lg:px-10 flex justify-between items-center">
          <section className="z-30 flex items-center space-x-2 sm:space-x-4 cursor-pointer">
            <img
              src={aauLogo}
              alt="Logo"
              loading="lazy"
              width="400"
              height="400"
              decoding="async"
              className="h-10 sm:h-12 lg:h-[52px] w-auto cursor-pointer"
              style={{ color: "transparent" }}
            />
            <div className="lg:flex flex-col justify-center logoDescription space-y-0 pl-2 sm:pl-4 border-l-2 min-h-8 sm:min-h-12 border-white cursor-pointer">
              <div>
                <div className="text-white text-[17px] sm:text-[18px] tracking-[3px] leading-snug mt-[-4px]">
                  አዲስ አበባ ዩኒቨርሲቲ
                </div>
                <div className="text-red-600 text-[13px] sm:text-[13.5px] font-medium tracking-wide leading-snug mt-[-4px] sm:mt-[-5px]">
                  ADDIS ABABA UNIVERSITY
                </div>
              </div>
              <div className="text-gray-400 text-[13px] hidden lg:flex">
                SINCE 1950
              </div>
            </div>
          </section>

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden text-white hover:text-gray-400 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <section className="hidden lg:flex bg-[#004165] justify-end pr-7">
            <div className="flex space-x-6">
              <Link
                to="/dashboard"
                className={`${
                  isActive("/dashboard")
                    ? "text-gray-400 font-semibold"
                    : "text-white hover:text-gray-400"
                } flex items-center space-x-1 cursor-pointer`}
              >
                <Bars3Icon className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/partnership"
                className={`${
                  isActive("/partnership")
                    ? "text-gray-400 font-semibold"
                    : "text-white hover:text-gray-400"
                } flex items-center space-x-1 cursor-pointer`}
              >
                <UsersIcon className="w-5 h-5" />
                <span>Partnerships</span>
              </Link>
              <Link
                to="/users"
                className={`${
                  isActive("/users")
                    ? "text-gray-400 font-semibold"
                    : "text-white hover:text-gray-400"
                } flex items-center space-x-1 cursor-pointer`}
              >
                <UsersIcon className="w-5 h-5" />
                <span>Users</span>
              </Link>
              <Link
                to="/settings"
                className={`${
                  isActive("/settings")
                    ? "text-gray-400 font-semibold"
                    : "text-white hover:text-gray-400"
                } flex items-center space-x-1 cursor-pointer`}
              >
                <Cog6ToothIcon className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <Link
                to="/profile"
                className={`${
                  isActive("/profile")
                    ? "text-gray-400 font-semibold"
                    : "text-white hover:text-gray-400"
                } flex items-center space-x-1 cursor-pointer`}
              >
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <div className="pl-4">
                <Link
                  to="/notifications"
                  className={`${
                    isActive("/notifications")
                      ? "text-gray-400 font-semibold"
                      : "text-white hover:text-gray-400"
                  } flex items-center space-x-1 relative cursor-pointer`}
                >
                  <BellIcon className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">3</span>
                  </div>
                </Link>
              </div>
              <div className="pl-4">
                <UserProfileMenu />
              </div>
            </div>
          </section>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-[#004165] z-20 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <Link
              to="/dashboard"
              className={`${
                isActive("/dashboard")
                  ? "text-gray-400 font-semibold"
                  : "text-white hover:text-gray-400"
              } flex items-center space-x-2 py-3 text-lg`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Bars3Icon className="w-6 h-6" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/partnership"
              className={`${
                isActive("/partnership")
                  ? "text-gray-400 font-semibold"
                  : "text-white hover:text-gray-400"
              } flex items-center space-x-2 py-3 text-lg`}
              onClick={() => setIsMenuOpen(false)}
            >
              <UsersIcon className="w-6 h-6" />
              <span>Partnerships</span>
            </Link>
            <Link
              to="/users"
              className={`${
                isActive("/users")
                  ? "text-gray-400 font-semibold"
                  : "text-white hover:text-gray-400"
              } flex items-center space-x-2 py-3 text-lg`}
              onClick={() => setIsMenuOpen(false)}
            >
              <UsersIcon className="w-6 h-6" />
              <span>Users</span>
            </Link>
            <Link
              to="/settings"
              className={`${
                isActive("/settings")
                  ? "text-gray-400 font-semibold"
                  : "text-white hover:text-gray-400"
              } flex items-center space-x-2 py-3 text-lg`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Cog6ToothIcon className="w-6 h-6" />
              <span>Settings</span>
            </Link>
            <Link
              to="/profile"
              className={`${
                isActive("/profile")
                  ? "text-gray-400 font-semibold"
                  : "text-white hover:text-gray-400"
              } flex items-center space-x-2 py-3 text-lg`}
              onClick={() => setIsMenuOpen(false)}
            >
              <UserIcon className="w-6 h-6" />
              <span>Profile</span>
            </Link>
            <Link
              to="/notifications"
              className={`${
                isActive("/notifications")
                  ? "text-gray-400 font-semibold"
                  : "text-white hover:text-gray-400"
              } flex items-center space-x-2 py-3 text-lg relative`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BellIcon className="w-6 h-6" />
              <span>Notifications</span>
              <div className="absolute left-8 top-3 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
            </Link>
            <div className="mt-4">
              <UserProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

"use client";
import React, { useContext } from "react";
import NavLink from "../NavLink/NavLink";
import { AuthContext } from "@/Context/AuthProvider";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  //logOut funtion

  const handleOut = () => {
    logOut()
      .then(() => {
        toast.success(" Logout Succes");
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>

      <li>
        <NavLink href="/favourite">Favourite</NavLink>
      </li>
      <li>
        <NavLink href="/add-blogs">Add Blogs</NavLink>
      </li>
      <li>
        <NavLink href="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <h2 className=" md:text-3xl text-2xl font-bold text-red-800">
            Techy Blogs
          </h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" flex gap-3">{navLinks}</ul>
        </div>
        <div className="navbar-end flex gap-5">
          <div>
            {user && (
              <h2 className=" md:text-xl text-lg   italic  ">
                Welcome, {user?.displayName}
              </h2>
            )}
          </div>
          <div>
            {user ? (
              <button
                onClick={handleOut}
                className=" md:text-2xl text-xl font-semibold px-2 py-1 rounded-lg transition-all duration-500  hover:text-white hover:bg-red-800 "
              >
                LogOut
              </button>
            ) : (
              <NavLink href="/login">
                <span className=" md:text-2xl text-xl font-semibold  hover:text-white hover:bg-red-800 ">
                  Login
                </span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

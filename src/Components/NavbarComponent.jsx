import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar } from "@heroui/react";
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function NavbarComponent() {
  let { userData,setUserData,isLoggedIn,setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    setIsLoggedIn(null)
    setUserData(null)
    navigate('/login')
  }
  return (
    <>
      <Navbar shouldHideOnScroll className="bg-gray-950">
        <NavbarBrand>
          <Link to={'/'}>
            <p className="font-bold text-xl text-sky-900">Linkey</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
        </NavbarContent>
        <NavbarContent justify="end">
          {isLoggedIn!=null ?
            <NavbarItem onClick={logout} className="flex items-center cursor-pointer space-x-0.5 text-red-600">
              <span>Logout</span>
              <svg className="w-5 h-5 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
              </svg>
            </NavbarItem> :
            <>
              <NavbarItem className="flex items-center cursor-pointer space-x-0.5 text-primary">
                <Link className="text-primary" to={'/register'}>Register</Link>
              </NavbarItem>
              <NavbarItem className="flex items-center cursor-pointer space-x-0.5 text-success">
                <Link className="text-success" to={'/login'}>Login</Link>
              </NavbarItem>
            </>}
          {isLoggedIn!=null ?
            <NavbarItem className="flex items-center cursor-pointer space-x-0.5">
              <Link to={'/user-info'}>
                <div className=" rounded-full p-0.5 border-3 border-sky-900">
                  <Avatar
                    // isBordered
                    radius="full"
                    size="sm"
                    src={userData?.photo}
                  />
                </div>
              </Link>
            </NavbarItem> : null}

        </NavbarContent>
      </Navbar>
    </>
  )
}

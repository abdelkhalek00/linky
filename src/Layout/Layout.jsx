import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../Components/NavbarComponent'

export default function Layout() {
  return (
    <>
        <div className="bg-slate-200 min-h-screen">
          <NavbarComponent/>
            <div className="container max-sm:px-2 mx-auto max-w-md md:max-w-xl lg:max-w-xl xl:max-w-3xl pt-5">
                <Outlet></Outlet>
            </div>
        </div>
    </>
  )
}

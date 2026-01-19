import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../Components/NavbarComponent'
import { ThemeContext } from '../Context/ThemeContext'

export default function Layout() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <>
      <main className={theme=='dark'?'dark':'light'}>
        <div className="bg-slate-50  dark:bg-slate-900 min-h-screen">
          <NavbarComponent />
          <div className="container max-sm:px-3 mx-auto max-w-md md:max-w-xl lg:max-w-xl xl:max-w-3xl pt-3">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </>
  )
}

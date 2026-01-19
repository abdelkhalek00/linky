import { createContext, useState } from "react";




export const ThemeContext=createContext()
export default function ThemeContextProvider({children}){
    const [theme, setTheme] = useState(localStorage.getItem('theme')||'light')
    return <ThemeContext.Provider value={{theme,setTheme}}>
        {children}
    </ThemeContext.Provider>
}

import { defaultOffset } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import { getLoggedUserDataApi } from "../API_Requests/API_Requests";

export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') || null)
    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </AuthContext.Provider>
}
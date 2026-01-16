import { defaultOffset } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import { getLoggedUserDataApi } from "../API_Requests/API_Requests";

export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token')||null)
    const [userData, setUserData] = useState()
    async function getLoggedUserData(){
        const response=await getLoggedUserDataApi()
        console.log(response)
        if(response.message){
            setUserData(response.user)
        }
    }

    useEffect(()=>{
        getLoggedUserData()
    },[])



    return <AuthContext.Provider value={{userData,setUserData,isLoggedIn,setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
}
import { createContext, useContext, useEffect } from "react";
import { useState } from 'react';
import { getAllPostsAPi } from "../API_Requests/API_Requests";
import { AuthContext } from "./AuthContext";




export const PostsContext = createContext()



export default function PostsContextProvider({ children }) {
    const{isLoggedIn}=useContext(AuthContext)
    const [allPosts, setAllPosts] = useState([])
    async function getallPosts() {
        let response = await getAllPostsAPi();
        setAllPosts(response.posts)
    }
    useEffect(()=>{
        if(isLoggedIn!=null){
            getallPosts()
        }
    },[isLoggedIn])


    return <PostsContext.Provider value={{ allPosts,getallPosts }}>
        {children}
    </PostsContext.Provider>
}
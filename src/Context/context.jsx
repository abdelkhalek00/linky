import { createContext, useEffect } from "react";
import { useState } from 'react';
import { getAllPostsAPi } from "../API_Requests/API_Requests";




export let PostsContext = createContext()



export default function PostsContextProvider({ children }) {


    const [allPosts, setAllPosts] = useState([])
    async function getallPosts() {
        let response = await getAllPostsAPi();
        console.log(response)
        setAllPosts(response.posts)
    }


    useEffect(()=>{
        getallPosts()
    },[])


    return <PostsContext.Provider value={{ allPosts }}>
        {children}
    </PostsContext.Provider>
}
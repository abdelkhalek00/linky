import React, { useContext, useEffect } from 'react'
import PostCardComponent from '../Components/PostCardComponent'
import { Card, Skeleton } from '@heroui/react'
import SkeletonComponent from '../Components/SkeletonComponent'
import { PostsContext } from '../Context/PostsContext'
import CreatePostComponent from '../Components/CreatePostComponent'
import { useQuery } from '@tanstack/react-query'
import { getAllPostsAPi } from '../API_Requests/API_Requests'
export default function FeedPage() {
  // let { allPosts } = useContext(PostsContext)

  const{data:allPosts,isLoading}=useQuery({
    queryKey:['getAllPosts'],
    queryFn:getAllPostsAPi,
    select:(data)=>data.data.posts
  })
  return (
    <>
      <div className="flex flex-col">
        <CreatePostComponent/>
        {isLoading?<SkeletonComponent/>:allPosts.map((post)=><PostCardComponent post={post} key={post.id}/>)}
        {/* {allPosts?.length > 0 ? allPosts.map((post) => <PostCardComponent post={post} key={post.id} />) : <SkeletonComponent/>} */}
      </div>
    </>
  )
}


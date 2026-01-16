import React, { useContext, useEffect } from 'react'
import PostCardComponent from '../Components/PostCardComponent'
import { Card, Skeleton } from '@heroui/react'
import SkeletonComponent from '../Components/SkeletonComponent'
import CreatePostComponent from '../Components/createPostComponent'
import { PostsContext } from '../Context/PostsContext'
export default function FeedPage() {
  let { allPosts } = useContext(PostsContext)
  return (
    <>
      <div className="flex flex-col">
        <CreatePostComponent/>
        {allPosts.length > 0 ? allPosts.map((post) => <PostCardComponent post={post} key={post.id} />) : <SkeletonComponent/>}
      </div>
    </>
  )
}


import { useEffect, useState } from 'react'
import PostCardComponent from '../Components/PostCardComponent'
import { useParams } from 'react-router-dom'
import { getPostDetailsApi } from '../API_Requests/API_Requests'
import SkeletonComponent from '../Components/SkeletonComponent'
import { useQuery } from '@tanstack/react-query'
export default function PostDetails() {
  let { postId } = useParams()
  const { data: postSelected, isLoading } = useQuery({
    queryKey:['getPostSelected',postId],
    queryFn:()=>getPostDetailsApi(postId),
    select:(data)=>data.data.post,
    enabled:!!postId
  })
  return (
    <>
      <h2 className='text-4xl text-slate-950 dark:text-white font-medium mb-10'>Post details</h2>
      {isLoading ? <SkeletonComponent /> : <PostCardComponent post={postSelected} />}
    </>
  )
}

import React, { useContext } from 'react'
import { PostsContext } from '../Context/context'

export default function FeedPage() {

  let {allPosts}=useContext(PostsContext)
  console.log(allPosts)
  return (
    <div>FeedPage</div>
  )
}


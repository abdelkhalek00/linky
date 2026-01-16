import { useEffect, useState } from 'react'
import PostCardComponent from '../Components/PostCardComponent'
import { useParams } from 'react-router-dom'
import { getPostDetailsApi } from '../API_Requests/API_Requests'
import SkeletonComponent from '../Components/SkeletonComponent'
export default function PostDetails() {
  const [postSelected, setPostSelected] = useState(null)
  let { postId } = useParams()
  async function getPostDetails() {
    const { post } = await getPostDetailsApi(postId)
    setPostSelected(post)
  }
  useEffect(() => {
    getPostDetails();
  }, [postId])
  return (
    <>
      <h2 className='text-4xl text-[#1D293D] font-medium'>Post details</h2>
      {postSelected == null ? <SkeletonComponent /> : <PostCardComponent post={postSelected} />}
    </>
  )
}

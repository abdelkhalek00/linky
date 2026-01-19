import React, { useContext, useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@heroui/react";
import { AuthContext } from '../Context/AuthContext'
import { getUserPostsApi } from '../API_Requests/API_Requests';
import SkeletonComponent from '../Components/SkeletonComponent';
import PostCardComponent from '../Components/PostCardComponent';
import { MdEdit } from "react-icons/md";
import { PostsContext } from '../Context/PostsContext';
export default function UserInfo() {
  const { userData } = useContext(AuthContext)
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([])

  async function getUserPosts() {
    if (!userData?._id) {
      return;
    }
    try {
      const response = await getUserPostsApi(userData._id)
      // console.log(response)
      if (response.message) {
        setUserPosts(response.posts)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (userData && userData._id) {
      getUserPosts()
    }
  }, [userData,userPosts])
  return (
    <>

      <div className="w-full rounded-xl h-auto py-5 px-3 my-4">
        <Card className="w-full mx-auto bg-slate-950 mb-15 shadow-2xl">
          <CardHeader className="flex justify-between flex-wrap">
            <div className="flex gap-5 max-md:mb-3">
              <Avatar className='ms-1'
                isBordered
                radius="full"
                size="md"
                src={userData?.photo}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-xl font-semibold leading-none text-white">{userData?.name}</h4>
                <h5 className="text-small tracking-tight text-secondary">{userData?.email}</h5>
              </div>
            </div>
            <Button
              className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
              color="primary"
              radius="full"
              size="sm"
            >
              <MdEdit />Update Profile
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400 overflow-hidden space-y-2">
            <div className="flex gap-1 items-center">
              <p className=''>Profile Created At: </p>
              <p className='font-bold text-white/80 lg'>{userData?.createdAt?.split("T")[0]}</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className=''>Birth Of Date: </p>
              <p className='font-bold text-white/80 lg'>{userData?.dateOfBirth}</p>
            </div>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1 items-center">
              <p className="font-semibold text-md text-secondary">{userPosts?.length}</p>
              <p className="text-small text-default-400">Posts</p>
            </div>
          </CardFooter>
        </Card>
        {/* {userPosts.length > 0 ? userPosts.reverse().map((post) => <PostCardComponent post={post} key={post.id} />) : <SkeletonComponent />} */}
        {isLoading ? <SkeletonComponent /> : userPosts.length === 0 ? <div><p className='text-red-600 text-center'>There aren't Posts</p></div> : [...userPosts].reverse().map((post) => <PostCardComponent post={post} key={post.id} />)}
      </div>
    </>
  )
}

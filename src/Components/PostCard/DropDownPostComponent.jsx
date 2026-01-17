import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { deletePostApi } from '../../API_Requests/API_Requests'
import { useLocation, useNavigate } from 'react-router-dom'
import { PostsContext } from '../../Context/PostsContext'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
export default function DropDownPostComponent({ post, getPostCommentsFunction }) {
    const [isLoading, setIsLoading] = useState(false)
    const { getallPosts } = useContext(PostsContext)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    async function deletePost(postId) {
        setIsLoading(true)
        const response = await deletePostApi(postId)
        console.log(response)
        if (response.message) {
            toastr.success("Post Deleted Success");
            getallPosts()
            if (pathname.includes('post-details')) {
                navigate('/')
            }
        }
        setIsLoading(false)
    }
    return (
        <>
            {
                isLoading ? <Spinner /> :
                    <Dropdown>
                        <DropdownTrigger>
                            <svg className="w-16 cursor-pointer outline-0" xmlns="http://www.w3.org/2000/svg"
                                width={27} height={27} viewBox="0 0 1 24" fill="none" stroke="#b0b0b0"
                                strokeWidth={2} strokeLinecap="square" strokeLinejoin="round">
                                <circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Example with disabled actions" disabledKeys={[]}>
                            <DropdownItem key="edit" onClick={() => navigate(`/edit-post/${post._id}`)}>Edit Post</DropdownItem>
                            <DropdownItem key="delete" onClick={() => { deletePost(post.id) }} className="text-danger" color="danger">
                                Delete Post
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
            }
        </>
    )
}

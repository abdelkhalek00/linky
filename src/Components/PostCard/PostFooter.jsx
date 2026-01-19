import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addCommentApi, getPostCommentsApi, updateCommentApi } from '../../API_Requests/API_Requests'
import { Button, Input } from '@heroui/react'
import { IoMdSend } from 'react-icons/io'
import { AuthContext } from '../../Context/AuthContext'
import commentProfile from '../../assets/download.png'
import DropDownCommentComponent from './DropDownCommentComponent'
import { AiOutlineLike } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { GoShareAndroid } from 'react-icons/go'
import toastr from "toastr";
import "toastr/build/toastr.min.css";


export default function PostFooter({ post }) {
    const [comments, setComments] = useState(post.comments)
    const { pathname } = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const { userData } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)
    const [editCommentId, setEditCommentId] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const navigate = useNavigate()

    async function getPostComments() {
        const response = await getPostCommentsApi(post.id)
        setComments(response.comments)
    }

    async function addComment(e) {
        e.preventDefault()
        if (commentContent.length == 0) {
            toastr.error("This Field Mustn't be Empty")
            return;
        }
        else {
            setIsLoading(true)
            try {
                const response = await addCommentApi(commentContent, post.id)
                console.log(response)
                if (response.message) {
                    setCommentContent('')
                    setComments(response.comments)
                }

            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
    }
    function handleUpdateComment(comment) {
        setCommentContent(comment.content)
        setEditCommentId(comment._id)
        setIsEditing(true)
    }

    async function updateComment(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await updateCommentApi(commentContent, editCommentId)
            console.log(response)
            if (response.message) {
                setCommentContent('')
                setIsEditing(false)
                setEditCommentId(null)
                getPostComments()
            }
        } catch (err) {
            console.log(err.response.data)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="w-full h-8 flex items-center px-3 my-3 border-b-1 pb-2 border-slate-400 dark:border-slate-500">
                <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
                    <svg className="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                </div>
                <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                    <svg className="w-3 h-3 fill-current stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                </div>
                <div className="w-full flex justify-between">
                    {/* <p className="ml-3 text-gray-500">{Math.floor(Math.random() * 51)}</p> */}
                    <p className='ms-2 text-gray-500'>5</p>
                    <p onClick={() => { navigate('/post-details/' + post._id) }} className="ml-3 text-gray-500 cursor-pointer"><span>{comments.length}</span> comment</p>
                </div>
            </div>
            {/* Post Actions */}
            <div className="flex justify-between items-center w-full px-5 pb-3 my-3 border-b-1 border-slate-400 dark:border-slate-500">
                <button className="flex justify-center items-center w-full space-x-3 max-md:space-x-1.5 cursor-pointer" onClick={() => { setIsLiked(!isLiked)}}><AiOutlineLike className={`text-3xl transition-all duration-200 ${isLiked ? "text-blue-700 scale-110" : "text-gray-500"}`} />
                    <span className={`font-semibold text-lg max-sm:text-sm max-md:text-md ${isLiked ? "text-blue-700 scale-110" : "text-gray-500"}`}>Like</span></button>
                <button className="flex justify-center items-center w-full space-x-3 max-md:space-x-1.5 cursor-pointer"><BiComment className='text-gray-500 text-3xl max-md:text-2xl' />
                    <span className="font-semibold text-lg max-sm:text-sm max-md:text-md text-gray-600">Comments</span></button>
                <button className="flex justify-center items-center w-full space-x-3 max-md:space-x-1.5 cursor-pointer"><GoShareAndroid className='text-gray-500 text-3xl max-md:text-2xl' />
                    <span className="font-semibold text-lg max-sm:text-sm max-md:text-md text-gray-600">Share</span></button>
            </div>

            <div className="addCommentForm relative">
                <form onSubmit={isEditing ? updateComment : addComment}>
                    <Input disabled={isLoading} className='my-3' color='default' variant='faded' placeholder='add comment' value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></Input>

                    {isEditing ? <Button color='warning' variant='faded' isLoading={isLoading} className='absolute right-0 top-1/2 -translate-y-1/2 border-0' type='submit'>Update <IoMdSend className='text-2xl' /></Button> : <Button isLoading={isLoading} className='absolute right-0 top-1/2 -translate-y-1/2 bg-transparent' type='submit'><IoMdSend className='text-2xl cursor-pointer text-[#1D293D]' /></Button>}
                </form>
            </div>


            {pathname.includes('post-details') ? comments.map((comment) =>
                comments.length > 0 && <div key={comment._id} className="w-full flex mt-5 mb-2">
                    <img className=" rounded-full w-8 h-8 me-2 p-0.5 bg-slate-400 dark:bg-white" onError={(e) => e.currentTarget.src = commentProfile} src={comment?.commentCreator?.photo} />
                    <div className='bg-slate-300 dark:bg-slate-900 py-1 ps-4 pe-6 rounded-xl'>
                        <div className="flex">
                            <h3 className="text-md font-semibold text-slate-950 dark:text-white">{comment?.commentCreator?.name}</h3>
                            {userData._id === post.user._id && userData._id === comment.commentCreator._id &&
                                <DropDownCommentComponent comment={comment} handleUpdateComment={handleUpdateComment} getPostCommentsFunction={getPostComments} />}
                        </div>
                        <span className='text-slate-800 dark:text-white/50 text-[12px] font-light -mt-2'>{comment?.createdAt.split("T")[0]}</span>
                        <p className='text-slate-950 dark:text-white/80 text-md mt-1'>{comment?.content}</p>
                    </div>
                </div>
            ) :
                comments.length > 0 && <div className="w-full items-center flex justify-between pt-2">
                    <div className="flex">
                        <img className=" rounded-full w-8 h-8 me-2 p-0.5 bg-slate-400 dark:bg-white" onError={(e) => e.currentTarget.src = commentProfile} src={comments[0]?.commentCreator?.photo} />
                        <div className='bg-slate-300 dark:bg-slate-900 py-1 ps-4 pe-6 rounded-xl'>
                            <div className="flex">
                                <h3 className="text-md font-semibold text-slate-950 dark:text-white -mb-1">{comments[0]?.commentCreator?.name}</h3>
                                {userData._id === post.user._id && userData._id === comments[0].commentCreator._id &&
                                    <DropDownCommentComponent comment={comments[0]} handleUpdateComment={handleUpdateComment} getPostCommentsFunction={getPostComments} />}
                            </div>
                            <span className='text-slate-800 dark:text-white/50 text-[12px] font-light'>{comments[0]?.createdAt.split("T")[0]}</span>
                            <p className='text-slate-950 dark:text-white/80 text-md mt-1'>{comments[0]?.content}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

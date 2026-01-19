import { Button, Input, Spinner, Textarea } from '@heroui/react'
import { useContext, useState } from 'react'
import { IoImages } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { createPostApi } from '../API_Requests/API_Requests';
import { PostsContext } from '../Context/PostsContext';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
export default function CreatePostComponent() {
    let { getallPosts } = useContext(PostsContext)
    const [previewImage, setPreviewImage] = useState("")
    const [postBody, setPostBody] = useState("")
    const [postImage, setPostImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    function handlePreviewImage(e) {
        setPostImage(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        e.target.value = null
    }
    async function createPost(e) {
        e.preventDefault()
        if (postBody.length == 0) {
            toastr.error("This Field mustn't be empty")
            return;
        }
        else {
            setIsLoading(true)
            try {
                const formData = new FormData();
                formData.append('body', postBody)
                if (postImage) {
                    formData.append('image', postImage)
                }
                // console.log(formData)
                const response = await createPostApi(formData)
                // console.log(response)
                if (response.message) {
                    getallPosts()
                    setPostBody("")
                    setPostImage(null)
                    setPreviewImage("")
                    toastr.success("Post Created Successfully");
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
    }
    return (
        <>
            <div className="w-full p-5 bg-slate-100 dark:bg-slate-950 rounded-2xl relative mb-10">
                {isLoading && <div className='absolute rounded-2xl inset-0 bg-white/10 flex justify-center items-center z-10'>
                    <Spinner /></div>}
                <form onSubmit={createPost}>
                    <Textarea className='mb-5' placeholder="what's in your mind" value={postBody} onChange={(e) => { setPostBody(e.target.value) }}></Textarea>

                    {previewImage && <div className='previewImage mb-3 relative'>
                        <img className='rounded-xl h-100 w-full object-cover' src={previewImage} />
                        <IoMdCloseCircle className='absolute top-3 right-3 text-white text-2xl cursor-pointer' onClick={() => setPreviewImage('')} />
                    </div>
                    }
                    <div className="flex justify-between items-center">
                        <label className='flex cursor-pointer' htmlFor="postImage"><IoImages className='text-2xl text-green-600 me-2' /> <span className='text-slate-700 dark:text-white/80'>Photo</span></label>
                        <Input onChange={handlePreviewImage} type='file' id='postImage' className='hidden' />

                        <Button isLoading={isLoading} color='primary' type='submit'>Post</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

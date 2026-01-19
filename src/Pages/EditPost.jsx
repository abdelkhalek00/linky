import { Button, Textarea, Input, Spinner } from '@heroui/react'
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { updatePostApi, getPostDetailsApi } from '../API_Requests/API_Requests'
import { PostsContext } from '../Context/PostsContext'
import { IoMdCloseCircle } from 'react-icons/io'
import { IoImages } from 'react-icons/io5'

export default function EditPost() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const { getallPosts } = useContext(PostsContext)
    const [previewImage, setPreviewImage] = useState("")
    const [postBody, setPostBody] = useState("")
    const [postImage, setPostImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getPost() {
            const response = await getPostDetailsApi(postId)
            setPostBody(response.post.body)
            setPreviewImage(response.post.image)
        }
        getPost()
    }, [])


    function handlePreview(e) {
        const file = e.target.files[0]
        if (file.size > 1024 * 1024) {
            alert("choose another Image")
            return;
        }
        if (file) {
            setPostImage(file)
            setPreviewImage(URL.createObjectURL(file))
            e.target.value = null
        }
    }
    async function updatePost(e) {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData()
        formData.append("body", postBody)
        if (postImage) {
            formData.append("image", postImage)
        }

        const response = await updatePostApi(postId, formData)

        if (response.message) {
            await getallPosts()
            navigate("/")
        }
        setIsLoading(false)
    }

    return (
        <div className="w-full bg-slate-950 rounded-2xl relative p-5">
            {isLoading && <div className='absolute inset-0 rounded-2xl bg-white/15 flex justify-center items-center z-10'>
                <Spinner /></div>}
            <form onSubmit={updatePost}>
                <Textarea className='mb-3' value={postBody} onChange={e => setPostBody(e.target.value)} />
                {previewImage && (
                    <div className="relative">
                        <img src={previewImage} className="rounded-xl h-100 w-full object-cover" />
                        <IoMdCloseCircle
                            className="absolute top-3 right-3 text-white text-2xl cursor-pointer"
                            onClick={() => {
                                setPreviewImage("")
                                setPostImage(null)
                            }}
                        />
                    </div>
                )}
                <div className="flex justify-between items-center mt-3">
                    <label className='flex cursor-pointer' htmlFor="postImage"><IoImages className='text-2xl text-green-600 me-2' /> <span className='text-white/80'>Image</span></label>
                    <Input className='hidden' type="file" id="postImage" onChange={handlePreview} />
                    <Button isLoading={isLoading} type="submit" color="primary">Update</Button>
                </div>
            </form>
        </div>
    )
}

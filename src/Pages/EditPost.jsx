import { Button, Textarea, Input, Spinner } from '@heroui/react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { updatePostApi, getPostDetailsApi } from '../API_Requests/API_Requests'
import { IoMdCloseCircle } from 'react-icons/io'
import { IoImages } from 'react-icons/io5'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../main'
import toastr from "toastr";


export default function EditPost() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [postImage, setPostImage] = useState(null)


    const { data: post, isLoading } = useQuery({
        queryKey: ['getPostDetails', postId],
        queryFn: () => getPostDetailsApi(postId),
        select: (data) => data?.data?.post
    })
    const [previewImage, setPreviewImage] = useState(post?.image || "")
    const [postBody, setPostBody] = useState(post?.body || "")

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

    const { mutate: updatePostMutate, isPending } = useMutation({
        mutationKey: ['updatePost', postId],
        mutationFn: ({ postId, formData }) => updatePostApi(postId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries(['getAllPosts'])
            toastr.success("Post Updated Success");
            navigate('/')
        }
    })


    function updatePost() {

        const formData = new FormData()
        formData.append('body', postBody)
        if (postImage) {
            formData.append('image', postImage)
        }

        updatePostMutate({ postId, formData })
    }

    return (
        <>
            <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-2xl relative p-5">
                {isPending && <div className='absolute inset-0 rounded-2xl bg-white/15 flex justify-center items-center z-10'>
                    <Spinner /></div>}


                <div>
                    <Textarea className='mb-3' defaultValue={postBody} onChange={e => setPostBody(e.target.value)} />
                    {(previewImage || post?.image) && (
                        <div className="relative">
                            <img src={previewImage || post?.image || null} className="rounded-xl h-100 w-full object-cover" />
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
                        <label className='flex cursor-pointer' htmlFor="postImage"><IoImages className='text-2xl text-green-600 me-2' /> <span className='text-slate-700     dark:text-white/80'>Photo</span></label>
                        <Input className='hidden' type="file" id="postImage" onChange={handlePreview} />
                        <Button isLoading={isPending} color="primary" onPress={updatePost}>Update</Button>
                    </div>
                </div>


            </div>
        </>
    )
}

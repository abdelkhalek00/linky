import React from 'react'

export default function PostBody({ post }) {
    return (
        <>
            <div>
                {post.body && <p className='text-slate-900 dark:text-white/80 pe-5'>{post?.body}</p>}
                {post.image && <div className="postImage my-5">
                    <img src={post.image} alt={post.body} className='w-full rounded-md h-100 object-cover' />
                </div>}
            </div>
        </>
    )
}

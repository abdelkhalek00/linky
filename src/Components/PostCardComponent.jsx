import { useState } from 'react'
import PostHeader from './PostCard/PostHeader';
import PostBody from './PostCard/PostBody';
import PostFooter from './PostCard/PostFooter';
export default function PostCardComponent({ post }) {
    return (
        <>
            <div className="bg-slate-100 dark:bg-slate-950 w-full rounded-xl shadow-2xl h-auto py-5 px-3 my-4">
                <PostHeader post={post} />
                <PostBody post={post} />
                <PostFooter post={post} />
            </div>

        </>
    )
}



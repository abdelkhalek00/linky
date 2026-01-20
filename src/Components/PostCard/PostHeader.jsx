import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import DropDownPostComponent from './DropDownPostComponent'

export default function PostHeader({post}) {
    const { userData } = useContext(AuthContext)
    return (
        <>
            <div className="w-full h-16 items-center flex justify-between ">
                <div className="flex">
                    <img className=" rounded-full w-10 h-10 mr-3 p-0.5 bg-white" src={post?.user?.photo} />
                    <div>
                        <h3 className="text-md text-slate-900 dark:text-white font-bold">{post?.user?.name}</h3>
                        <p className="text-xs text-slate-600 dark:text-gray-500">{new Date(post?.createdAt)
                            .toISOString()
                            .slice(0, 16)
                            .replace("T", " ")}
                        </p>
                    </div>
                </div>
                {userData?._id === post?.user?._id ? <DropDownPostComponent post={post} />:null}
            </div>
        </>
    )
}

import { Button, Input } from '@heroui/react'
import React from 'react'
import { FaImage } from 'react-icons/fa'


export default function UpdateProfilePage() {
    return (
        <>
            <div className="updatePhoto">
                <h2 className='text-white text-2xl pb-10'>Update User Photo</h2>
                <form>
                    <label htmlFor="profileImage" className='text-xl text-white flex items-center gap-3'><FaImage className='text-green-500 text-2xl' />Select Profile Image</label>
                    <Input type='file' className='hidden' id='profileImage' />
                </form>
            </div>
        </>
    )
}

import { Button, Input, Radio, RadioGroup, Select, SelectItem } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { LoginFunctionApi } from '../API_Requests/AuthApi_Requests';
import { Link, useNavigate } from 'react-router-dom';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { AuthContext } from '../Context/AuthContext';
export default function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const {setIsLoggedIn}=useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    async function UserLogin(formData) {
        setIsLoading(true)
        const response = await LoginFunctionApi(formData)
        if (response.message) {
            toastr.success('Login Success')
            localStorage.setItem('token', response.token)
            setIsLoggedIn(response.token)
            setErrorMessage(null)
            navigate('/')
        }
        else{
            setErrorMessage(response.error)
        }
        setIsLoading(false)
    }
    return (
        <>
            <div className="container w-full min-h-screen flex items-center">
                <form className='w-8/10 lg:w-6/10 mx-auto max-sm:w-full' onSubmit={handleSubmit(UserLogin)}>
                    <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 p-10 bg-slate-950 rounded-2xl">
                        <h2 className='text-sky-800 text-2xl font-bold mb-5'>Login Form</h2>
                        <Input className="" label="Email" color='' variant='faded' type="email" {...register("email")} />
                        <Input className="" label="password" color='' variant='faded' type="password" {...register("password")} />
                        <Button isLoading={isLoading} color='primary' className='mt-3' type='submit'>Login</Button>
                        <div><p className='text-white/60'>if You haven't an Account Please, <Link className='text-primary' to={'/register'} >Register</Link></p></div>
                        {errorMessage&&<p className='text-red-600 text-center'>{errorMessage}</p>}
                    </div>
                </form>
            </div>

        </>
    )
}

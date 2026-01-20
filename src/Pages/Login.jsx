import { Button, Input, Radio, RadioGroup, Select, SelectItem } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { LoginFunctionApi } from '../API_Requests/AuthApi_Requests';
import { Link, useNavigate } from 'react-router-dom';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { AuthContext } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import * as zod from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
const schema = zod.object({
    email: zod.string().
        nonempty('Email is required')
        .email('Invalid email address'),

    password: zod.string()
        .nonempty('password is required')
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character.'),
})

export default function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })
    const { setIsLoggedIn } = useContext(AuthContext)
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
        else {
            setErrorMessage(response.error)
        }
        setIsLoading(false)
    }
    return (
        <>
            <div className="container w-full flex items-center">
                <form className='w-8/10 lg:w-6/10 mx-auto max-sm:w-full' onSubmit={handleSubmit(UserLogin)}>
                    <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 p-10 translate-y-25 bg-slate-100 dark:bg-slate-950 shadow-2xl rounded-2xl">
                        <h2 className='text-sky-800 text-2xl font-bold mb-5'>Login Form</h2>
                        <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} className="text-slate-950 dark:text-white" label="Email" color='' variant='faded' type="email" {...register("email")} />
                        <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} className="text-slate-950 dark:text-white" label="password" color='' variant='faded' type="password" {...register("password")} />
                        <Button isLoading={isLoading} color='primary' className='mt-3' type='submit'>Login</Button>
                        <div><p className='text-slate-800 dark:text-white/60'>if You haven't an Account Please, <Link className='text-primary' to={'/register'} >Register</Link></p></div>
                        {errorMessage && <p className='text-danger text-center'>{errorMessage}</p>}
                    </div>
                </form>
            </div>

        </>
    )
}

import { Button, Input, Radio, RadioGroup, Select, SelectItem } from '@heroui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod"
import { RegisterFunctionApi } from '../API_Requests/AuthApi_Requests';
import { Link, useNavigate } from 'react-router-dom';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const schema = zod.object({
    name: zod.string().nonempty('name is required')
        .min(3, 'min length is 3 characters')
        .max(15, 'max length is 15 characters'),

    email: zod.string().
        nonempty('Email is required')
        .email('Invalid email address'),

    password: zod.string()
        .nonempty('password is required')
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character.'),
    rePassword: zod.string()
        .nonempty('password is required'),
    dateOfBirth: zod.coerce.date(),
    gender: zod.string().nonempty('gender is required')

}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: 'password not match' })


export default function Register() {
    const navigate = useNavigate()
    const animals = [
        { key: "male", label: "male" },
        { key: "female", label: "female" },
    ];
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })
    async function userRegister(formData) {
        setIsLoading(true)
        const response = await RegisterFunctionApi(formData)
        console.log(response)
        if (response.message) {
            toastr.success("Register Success, Please Login")
            navigate('/login')
            setErrorMessage(null)
        }
        else {
            setErrorMessage(response.error)
        }
        setIsLoading(false)
    }
    console.log(errors)
    return (
        <>
            <div className="container flex items-center">
                <form className='w-8/10 lg:w-6/10 mx-auto max-sm:w-full' onSubmit={handleSubmit(userRegister)}>
                    <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 p-10 mb-5 bg-slate-100 dark:bg-slate-950 shadow-2xl rounded-2xl">
                        <h2 className='text-sky-800 text-2xl font-bold mb-5'>Registration Form</h2>
                        <Input isInvalid={Boolean(errors?.name)} errorMessage={errors.name?.message} className="text-slate-950 dark:text-white" label="name" color='' variant='faded' type="text" {...register("name")} />
                        <Input isInvalid={Boolean(errors?.email)} errorMessage={errors.email?.message} className="text-slate-950 dark:text-white" label="Email" color='' variant='faded' type="email" {...register("email")} />
                        <Input isInvalid={Boolean(errors?.password)} errorMessage={errors.password?.message} className="text-slate-950 dark:text-white" label="password" color='' variant='faded' type="password" {...register("password")} />
                        <Input isInvalid={Boolean(errors?.rePassword)} errorMessage={errors.rePassword?.message} className="text-slate-950 dark:text-white" label="rePassword" color='' variant='faded' type="password" {...register("rePassword")} />
                        <div className="grid grid-cols-2 gap-2">
                            <Input className="text-slate-950 dark:text-white" label="dateOfBirth" color='' variant='faded' type="date" {...register("dateOfBirth")} />
                            <Select className="max-w-xs" label="Select your Gender" {...register("gender")}>
                                {animals.map((animal) => (
                                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                                ))}
                            </Select>
                        </div>
                        <Button isLoading={isLoading} color='primary' className='mt-3' type='submit'>Register</Button>
                        <div><p className='text-slate-800 dark:text-white/60'>if You have an Account Please, <Link className='text-sky-800' to={'/login'} >Login</Link></p></div>
                        {errorMessage && <p className='text-danger text-center'>{errorMessage}</p>}
                    </div>
                </form>
            </div>

        </>
    )
}

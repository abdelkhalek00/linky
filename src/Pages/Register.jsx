import { Button, Input, Radio, RadioGroup, Select, SelectItem } from '@heroui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { RegisterFunctionApi } from '../API_Requests/AuthApi_Requests';
import { Link, useNavigate } from 'react-router-dom';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
export default function Register() {
    const navigate = useNavigate()
    const animals = [
        { key: "male", label: "male" },
        { key: "female", label: "female" },
    ];
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const { register, handleSubmit } = useForm()
    async function userRegister(formData) {
        setIsLoading(true)
        const response = await RegisterFunctionApi(formData)
        console.log(response)
        if (response.message) {
            toastr.success("Register Success, Please Login")
            navigate('/login')
            setErrorMessage(null)
        }
        else{
            setErrorMessage(response.error)
        }
        setIsLoading(false)
    }
    return (
        <>
            <div className="container w-full min-h-screen flex items-center">
                <form className='w-8/10 lg:w-6/10 mx-auto max-sm:w-full' onSubmit={handleSubmit(userRegister)}>
                    <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 p-10 bg-slate-950 rounded-2xl">
                        <h2 className='text-sky-800 text-2xl font-bold mb-5'>Registration Form</h2>
                        <Input className="" label="name" color='' variant='faded' type="text" {...register("name")} />
                        <Input className="" label="Email" color='' variant='faded' type="email" {...register("email")} />
                        <Input className="" label="password" color='' variant='faded' type="password" {...register("password")} />
                        <Input className="" label="rePassword" color='' variant='faded' type="password" {...register("rePassword")} />
                        <div className="grid grid-cols-2 gap-2">
                            <Input className="" label="dateOfBirth" color='' variant='faded' type="date" {...register("dateOfBirth")} />
                            <Select className="max-w-xs" label="Select your Gender" {...register("gender")}>
                                {animals.map((animal) => (
                                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                                ))}
                            </Select>
                        </div>
                        <Button isLoading={isLoading} color='primary' className='mt-3' type='submit'>Register</Button>
                        <div><p className='text-white/60'>if You have an Account Please, <Link className='text-sky-800' to={'/login'} >Login</Link></p></div>
                        {errorMessage && <p className='text-red-600 text-center'>{errorMessage}</p>}
                    </div>
                </form>
            </div>

        </>
    )
}

// import React, { useState } from 'react'
// import { Input } from "@heroui/input";
// import { Button, Radio } from '@heroui/react';
// import { RadioGroup } from "@heroui/react";
// import { Controller, useForm } from 'react-hook-form';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '../schema/RegisterSchema';
// import { sendRegisterData } from '../API_Requests/AuthFunctions';


// export default function Register() {
//     const [loading, setLoading] = useState(false)
//     const [apiError, setApiError] = useState(null)



//     const { handleSubmit, register, control, formState: { errors } } = useForm({
//         defaultValues: {
//             name: '',
//             email: '',
//             password: '',
//             rePassword: '',
//             dateOfBirth: '',
//             gender: ''
//         },
//         resolver: zodResolver(registerSchema),
//         mode: 'all'
//     })
//     const navigate=useNavigate()
//     async function handleRegister(userData) {
//         setLoading(true)
//         const response = await sendRegisterData(userData)
//         console.log(response);
//         setLoading(false)
//         if(response.message){
//             navigate('/login')
//         }else{
//             setApiError(response.error)
//         }
//     }

//     return (
//         <>
//             <form onSubmit={handleSubmit(handleRegister)} className="bg-white shadow-2xl rounded-2xl py-10 px-6 min-w-md">
//                 <h2 className='text-2xl mb-7 text-secondary'>register Now</h2>
//                 <div className="flex flex-col gap-4">
//                     <div>
//                         <Input isInvalid={Boolean(errors.name)} errorMessage={errors.name?.message} label="User Name" {...register('name')} type="text" />
//                     </div>
//                     <div>
//                         <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} label="Email" {...register('email')} type="email" />
//                     </div>
//                     <div>
//                         <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} label="Password" {...register('password')} type="password" />
//                     </div>
//                     <div>
//                         <Input label="Confirm Password" isInvalid={Boolean(errors.rePassword)} errorMessage={errors.rePassword?.message} {...register('rePassword')} type="password" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-3 ">
//                         <Input isInvalid={Boolean(errors.dateOfBirth)} errorMessage={errors.dateOfBirth?.message} label="date of birth" {...register('dateOfBirth')} type="date" />
//                         <Controller
//                             name="gender"
//                             control={control}
//                             render={({ field }) => (
//                                 <RadioGroup
//                                     label="Select your gender"
//                                     orientation="horizontal"
//                                     value={field.value}
//                                     onValueChange={field.onChange}
//                                     isInvalid={Boolean(errors.gender)}
//                                     errorMessage={errors.gender?.message}
//                                 >
//                                     <Radio value="male">Male</Radio>
//                                     <Radio value="female">Female</Radio>
//                                 </RadioGroup>
//                             )}
//                         />
//                     </div>
//                     <Button isLoading={loading} color="secondary" type='submit'>Register</Button>
//                     <NavLink to={'/login'} className={'text-blue-600 underline'}>already have an account</NavLink>
//                     {apiError?<p className='text-danger-500 text-center'>{apiError}</p>:null}
//                 </div>
//             </form>
//         </>
//     )
// }

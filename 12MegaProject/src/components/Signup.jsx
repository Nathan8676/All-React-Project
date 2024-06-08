import React, { useState } from 'react'
import AuthService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import {Logo, Input, Button} from './index'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login as StoreLogin } from '../Store/authSlice'


function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [register, handleSubmit] = useForm()
    
    const signup = async (data) => {
        setError("")
        try {
           const session = await AuthService.createAccount(data)
           if(session){
            const userData = await AuthService.getCurrentUser()
            if(userData){
                dispatch(StoreLogin(userData))
                navigate('/')
            }
           }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div  className="mb-2 flex justify-center" >
                <span className="mb-2 flex justify-center" >
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Make a New account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                 Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
        {error && <p className="text-red-600 mt-8 text-center" >{error}</p>}
        <form onSubmit={handleSubmit(signup)} >
            <div className='space-y-5'>
                <Input
                label = 'FullName:'
                type='text'
                placeholder="Enter your full name"
                {...register('FullName', {
                    required: true,
                    maxLength: 25,
                    Validate: {
                        matchPattern: (value) => /^[A-Z][a-z]*\s([A-Z][a-z]*\s)?[A-Z][a-z]*$/.test(value) || "Name must be valid"
                    }
                })}
                />
                <Input
                label = 'Email:'
                type='email'
                placeholder="Enter your email"
                {...register('email', {
                    required: true,
                    validate: {
                        matchPattern: (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/ .test(value) || "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label = 'Password:'
                type = 'password'
                placeholder="Enter your password"
                {...register('password', {
                    required: true,
                    validate: {
                        matchPattern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
                    }
                })}
                />
                <Button
                children='Sign Up'
                type='submit'
                className='w-full'
                />
            </div>
        </form>
    </div>
  )
}

export default Signup
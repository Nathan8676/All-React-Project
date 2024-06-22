import React, {useState} from 'react'
import {login as StoreLogin} from '../Store/authSlice'
import {useDispatch} from 'react-redux'
import {useNavigate , Link} from 'react-router-dom'
import AuthService from '../appwrite/auth'
import {Logo, Button, Input} from './index'
import {useForm} from 'react-hook-form'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState("")
    const {register, handleSubmit} = useForm()

    const login = async (data) => {
        try {
            setError("")
            const session = await AuthService.login({email: data.email, password: data.password})
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
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div  className="mb-2 flex justify-center" >
                <span className="mb-2 flex justify-center" >
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            <p className="mt-2 text-center text-base text-black/60">
                Forgot Password?&nbsp;
                <Link
                    to='/create-password-recovery'
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Forgot Password
                </Link>
            </p>
       
        {error && <p className="text-red-600 mt-8 text-center" >{error}</p>}
            <form onSubmit={handleSubmit(login)} >
                <div className='space-y-5'>
                <Input
                    label= 'email: '
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/ .test(value) || "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label = 'Password: '
                    placeholder= "Enter your password"
                    type="password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button
                    children="Login"
                    type='submit'
                    className='w-full'
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
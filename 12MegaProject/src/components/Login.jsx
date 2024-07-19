import React from 'react'
import { loginUser } from '../Store/authSlice'
import {useDispatch , useSelector} from 'react-redux'
import {useNavigate , Link} from 'react-router-dom'
import {Logo, Button, Input} from './index'
import {useForm} from 'react-hook-form'
import { FaTruckLoading } from 'react-icons/fa'
function Login() {
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = auth.loading 
    const error = auth.loginError
    const {register, handleSubmit} = useForm()

    const login = async (data) => {

        dispatch(loginUser({...data})).then((session) => {
        if(session === session.error){
        navigate('/login')
        }if(session){
         navigate('/')
         return
        }   
        })
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg  dark:bg-zinc-950 dark:text-white dark:border-black bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div  className="mb-2 flex justify-center" >
                <span className="mb-2 flex justify-center" >
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold  leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base dark:text-white text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary dark:text-white transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            <p className="mt-2 text-center dark:text-white text-base text-black/60">
                Forgot Password?&nbsp;
                <Link
                    to='/create-password-recovery'
                    className="font-medium text-primary dark:text-white transition-all duration-200 hover:underline"
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
                    <Button type='submit' className='w-full'>
                        {loading ? <FaTruckLoading className='animate-spin' /> : "Login"}
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
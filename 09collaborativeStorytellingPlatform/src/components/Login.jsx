import React , {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import {Input , Button} from './index'
import {useForm} from 'react-hook-form'
import { loginUser } from '../store/authSlice'

function Login({setView, isPopUp}) {
    const auth = useSelector(state => state.auth)
    const loading = auth.loading.login
    const error = auth.loginError
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , handleSubmit} = useForm()

    const login = async (data) => {
        dispatch(loginUser({...data})).then((session) => {
        if(session.error){
        }if(session){
         window.location.reload()
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
                Logo
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold  leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base dark:text-white text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
                className="font-medium text-primary dark:text-white transition-all duration-200 hover:underline"
                onClick={isPopUp ? () => setView('signup') : () => navigate('/signup')}
            >
                Sign Up
            </Link>
        </p>
        <p className="mt-2 text-center dark:text-white text-base text-black/60">
            Forgot Password?&nbsp;
            <Link
                className="font-medium text-primary dark:text-white transition-all duration-200 hover:underline"
                onClick={isPopUp ? () => setView('passwordReset') : () => navigate('/make-password-recovery')}
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
                type='submit'
                className='w-full'
                bgColor='bg-red-500'
                textColor='text-white'
                children={loading ? "Loading..." : "Login"}
                />
                
            </div>
        </form>
     </div>
    </div>
  )
}

export default Login

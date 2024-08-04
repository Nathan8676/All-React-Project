import React , {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import {Input , Button} from './index'
import {signupUser} from '../store/authSlice'
import {useForm} from 'react-hook-form'
function Signup({setView}) {
    const auth = useSelector(state => state.auth)
    const loading = auth.loading.signup
    const error = auth.signupError
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , handleSubmit} = useForm()

    const Register = async (data) => {
        dispatch(signupUser({...data})).then((session) => {
        if(session.error){
        return
        }if(session){
         navigate('/')
         return
        }   
        })
    }

    return (
    <div className='flex items-center justify-center'>
    <div className={`mx-auto w-full max-w-lg dark:bg-zinc-950 dark:text-white dark:border-black bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div  className="mb-2 flex justify-center" >
            <span className="mb-2 flex justify-center" >
               Logo
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Make a New account</h2>
        <p className="mt-2 text-center text-base dark:text-white text-black/60">
             Already have an account?&nbsp;
            <Link
                className="font-medium dark:text-white text-primary transition-all duration-200 hover:underline"
                onClick={() => setView('login')}
            >
                Login
            </Link>
        </p>
  
        {error && <p className="text-red-600 mt-8 text-center" >{error}</p>}
      <form onSubmit={handleSubmit(Register)} >
        <div className='space-y-5'>
            <Input
            label = 'FullName:'
            type='text'
            placeholder="Enter your full name"
            {...register('name', {
                required: true,
                maxLength: 25,
                Validate: {
                    matchPattern: (value) => /^[A-Z][a-z]*\s([A-Z][a-z]*\s)?[A-Z][a-z]*$/.test(value) || "Name must be valid"
                }
            })}
            />
            <Input
            label = 'email:'
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
            label = 'password:'
            type = 'password'
            placeholder="Enter your password"
            {...register('password', {
                required: true,
             
            })}
            />
            <Button
            type='submit'
            className='w-full'>
                {loading ? "Loading..." : "Sign Up"}
            </Button>
            
        </div>
      </form> 
    </div>
</div>
)
}

export default Signup
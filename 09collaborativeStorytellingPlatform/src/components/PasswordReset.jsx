import React , {useState} from 'react'
import {Input, Button} from './index'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import AuthService from '../appwrite/auth'
function PasswordReset({setView}) {

    const {register, handleSubmit} = useForm()
    const [error , setError] = useState('')
    const [getEmailId, setGetEmailId] = useState(false)

    const RecoveryPass = async(data) => {
        setError("")
        setGetEmailId(false)
    const Token = await AuthService.passwordRecovery({userEmailId: data.email, passwordResetPage:window.location.origin + '/update-password'})
        if(Token && Token.error){
            setError(Token.error)
            return  
        }else{
            if(Token){
            setGetEmailId(true)
           }
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div  className="mb-2 flex justify-center" >
                    <span className="mb-2 flex justify-center" >
                        Logo
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Recovery Password</h2>
                <p className="mt-2 text-center text-base dark:text-white text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        className="font-medium text-primary dark:text-white transition-all duration-200 hover:underline"
                        onClick={() => setView('signup')}
                    >
                        Sign Up
                    </Link>
                </p>
                <p className='mt-2 text-center text-base dark:text-white text-black/60'> Remembered your password?
                    <Link
                        className="font-medium text-primary dark:text-white transition-all duration-200 hover:underline"
                        onClick={() => setView('login')}
                    >
                        Login
                    </Link>
                </p>
                {getEmailId ? 
                    <h2 className='text-center py-4 ' > The Reset Password Link Has Been Sent To Your Email</h2>
                    : <> 
                    {error && <p className="text-red-600 mt-8 text-center" >{error}</p>}
                    <form onSubmit={handleSubmit(RecoveryPass)}>
                        <div className='space-y-5'>
                        <Input
                            label= 'Email: '
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/ .test(value) || "Email address must be a valid address",
                                }
                            })}
                            />
                        <Button type="submit" children="Recovery Password" className="w-full" />
                        </div>
                    </form>
                    </>
                }
            </div>
        </div>   
      )
}

export default PasswordReset
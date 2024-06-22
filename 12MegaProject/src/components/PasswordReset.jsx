import React, {useState} from 'react'
import {Logo, Input, Button} from './index'
import {useForm} from 'react-hook-form'
import AuthService from '../appwrite/auth'
function PasswordReset() {
    const {register, handleSubmit} = useForm()
    const [getEmailid, setGetEmailid] = useState(false)
    const [error , setError] = useState("")

    const RecoveryPass = async(data) => {
        setError("")
        setGetEmailid(false)
    const Token = await AuthService.passwordRecovery({userEmailId: data.email, passwordResetPage:window.location.origin + '/update-password'})
        if(Token && Token.error){
            setError(Token.error)
            return  
        }else{
            if(Token){
            setGetEmailid(true)
           }
        }
    }


  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div  className="mb-2 flex justify-center" >
                <span className="mb-2 flex justify-center" >
                    <Logo width="100%" />
                </span>
            </div>
      
       {getEmailid ? 
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
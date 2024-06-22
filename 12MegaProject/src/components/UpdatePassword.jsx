import React, { useState} from 'react'
import {Logo, Input, Button} from './index'
import {useForm} from 'react-hook-form'
import AuthService from '../appwrite/auth'
import {useNavigate, useLocation} from 'react-router-dom'

function UpdatePassword() {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState(null)

    const queryParams = new URLSearchParams(location.search)
    const userId = queryParams.get('userId')
    const secret = queryParams.get('secret')

    const updatePassword = async (data) => {
        setError(null)
        if(data.password !== data.confirmPassword){
            setError('Password does not match')
            return
        }
        const Token = await AuthService.updateRecovery( {userId:userId, secretCode:secret, newPassword:data.password, newPasswordConfirm:data.confirmPassword})
        
        if(Token && Token.error){
            setError(Token.error)
            return
        } else{
            if(Token){
                navigate('/login')
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
   
   {error && <p className="text-red-600 mt-8 text-center" >{error}</p>}
   <form onSubmit={handleSubmit(updatePassword)}>
       <div className='space-y-5'>
        <Input
        type="password"
        label= 'Password: '
        placeholder='Enter your password'
        {...register("password",{
            required: true,
               
        })}
        />
        <Input
        type="password"
        label= 'Confirm Password: '
        placeholder='Confirm your password'
        {...register("confirmPassword",{
            required: true,
        })}
        />

        <Button
        type="submit"
        children="Change Password"
        textColor="text-white"
        className="w-full"
        />
       </div>

   </form>
   </div>
   </div>
  )
}

export default UpdatePassword
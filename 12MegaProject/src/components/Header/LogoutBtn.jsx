import React from 'react'
import AuthService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/authSlice'
function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        AuthService.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {
            console.log("this error is from components::logout", error);
        })

    }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
    
  )
}

export default Logout
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/authSlice'
import { clearUserProfileSlice} from '../store/userProfileSlice'
function Logoutbtn() {
    const authLoading = useSelector((state) => state.auth.loading.logout)
    const dispatch = useDispatch()
    const logoutHandler = async () => {
      dispatch(logoutUser()).then((response) => {
        console.log(response)
        if(response.error?.message){
          console.log('this error is from LogoutBtn', response.error.message)
        }else if (response.payload === true){
          dispatch(clearUserProfileSlice())

        }
      })
    }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-500 dark:text-white text-black bg-blue-400 rounded-full'
    onClick={logoutHandler}
    >{authLoading ? "Loading..." : 'Logout'}</button>
    
  )
}

export default Logoutbtn
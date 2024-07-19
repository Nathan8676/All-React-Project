import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../Store/authSlice'
import { FaTruckLoading } from 'react-icons/fa'
import { clearPostsSlice } from '../../Store/postsSlice'
function Logoutbtn() {
    const authLoading = useSelector((state) => state.auth.loading)
    const dispatch = useDispatch()
    const logoutHandler = async () => {
      dispatch(logoutUser()).then((response) => {
        console.log(response)
        if(response.error?.message){
          console.log('this error is from LogoutBtn', response.error.message)
        }else if (response.payload === true){
          dispatch(clearPostsSlice())

        }
      })
    }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-400 text-white rounded-full'
    onClick={logoutHandler}
    >{authLoading ? <FaTruckLoading className='animate-spin' /> : 'Logout'}</button>
    
  )
}

export default Logoutbtn
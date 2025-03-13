import React , {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

function ProfileCheck({authentication, children}) {
    const navigate = useNavigate()
    const UserProfileStatus = useSelector(state => state.userProfile.status)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if(authentication && UserProfileStatus !== authentication){
            navigate('/create-profile')
        }else if(!authentication && UserProfileStatus !== authentication){
            navigate('/profile')
        }
        setLoading(false)
    },[UserProfileStatus, navigate, authentication])

  return loading ? <h1>Loading...</h1> : children
}

export default ProfileCheck
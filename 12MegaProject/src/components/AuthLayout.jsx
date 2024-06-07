import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'


function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    const [loding, setLoading] = useState(true)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoading(false)
    },[authStatus, navigate, authentication])

  return loding ? <h1>Loding...</h1> : {children}
}

export default Protected
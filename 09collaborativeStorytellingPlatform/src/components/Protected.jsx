import React from 'react'
import {AuthCheck , ProfileCheck} from './index.js'

function Protected({children, authentication , ProfileAuth}) {

    return (
        <AuthCheck authentication={authentication}>
            <ProfileCheck authentication={ProfileAuth}>
                {children}
            </ProfileCheck>
        </AuthCheck>
    )
}

export default Protected
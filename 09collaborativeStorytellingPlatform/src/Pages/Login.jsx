import React from 'react'
import {Login as LoginComp, Container} from '../components'
function Login() {
  return (
    <Container>
        <LoginComp isPopUp={false}/>
    </Container>
  )
}

export default Login
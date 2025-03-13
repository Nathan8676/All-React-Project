import React from 'react'
import {Signup as SignupComp, Container} from '../components'
function Signup() {
  return (
    <Container>
        <SignupComp isPopUp={false}/>
    </Container>
  )
}

export default Signup
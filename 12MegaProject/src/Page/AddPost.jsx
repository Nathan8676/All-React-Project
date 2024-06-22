import React from 'react'
import { Container, Logo, PostForms} from '../components/index'
function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <Logo/>
        <PostForms/>
      </Container>
    </div>
  )
}

export default AddPost
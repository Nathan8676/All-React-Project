import React, { useEffect, useState } from 'react'
import {PostForms, Container} from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../Store/postsSlice'
import { Query } from 'appwrite'
import { FaTruckLoading } from 'react-icons/fa'

function EditedPost() {
    const Post = useSelector(state => state.posts.singlePost)
    const error = useSelector(state => state.posts.singlePostError)
    const loading = useSelector(state => state.posts.singlePostLoading)
    const userData = useSelector(state => state.auth.userData)
    const {slug} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if(!Post){
          const queries = [Query.equal('USERID', userData?.$id)]
          const singlePost = dispatch(getPost({Id: slug, queries: queries}))
          if(singlePost && singlePost.error){
            console.log(singlePost.error)
            return
          }
        }
    }, [slug])
    if(loading){
        return (
            <div className='py-8'>
                <Container>
                    <FaTruckLoading className='text-4xl text-blue-500 animate-spin'/>
                </Container>
            </div>
        )
    }else if (error) {
        return (
            <div className='py-8'>
                <Container>
                    <h1>{error}</h1>
                </Container>
            </div>
        )
    }else {
  return Post ? (
   <div className='py-8'>
      <Container>
        <PostForms Post={Post}/>
      </Container>
    </div>
  ) : (
    <div className='py-8'>
      <Container>
        <h1>Post not found</h1>
      </Container>
    </div>
  )
}
}

export default EditedPost
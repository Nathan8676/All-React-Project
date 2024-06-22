import React, { useEffect, useState } from 'react'
import {PostForms, Container} from '../components'
import { useParams, useNavigate, useLoaderData } from 'react-router-dom'
import databaseConfi from '../appwrite/DatabaseConfi'

function EditedPost() {
    const Post = useLoaderData()
    
   /*  const Navigate = useNavigate()
    const {slug} = useParams()
    useEffect(() => {
    if(slug){
        databaseConfi.getPost(slug).then((post) => {
          if(post){
              setPost(post)
          }
        })
        
    }else {
        Navigate("/")
    }
    }, [slug, Navigate]) */
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

export default EditedPost

export const EditedPostLoader = async ({params}) => {
    const {slug} = params
    if(slug){
      const post = await databaseConfi.getPost(slug)
      return post
    }else{
      navigator("/")
    }
}
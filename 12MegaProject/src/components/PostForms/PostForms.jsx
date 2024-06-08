import React, {useCallback, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import databaseConfi  from '../../appwrite/DatabaseConfi'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Button , Input , Logo , RTE, Select} from '../index'
function PostForms({Post}) {

  const {register, setValue, getValues, watch, control , handleSubmit} = useForm({
    defaultValues: {
      title: Post?.title || "",
      content: Post?.content || "",
      status: Post?.status || "inactive",
    }
  })
  const [error , setError] = useState("")
  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)

  const Post = async(data) => {
    setError("")
    if(Post){
      const file = await data.image[0]? databaseConfi.uploadFile(data.image[0]) : null
      if(file) {
        await databaseConfi.deleteFile(Post.FEATUREDIMG)
      }
     const updatedPost = await databaseConfi.updatePost(Post.$id, {...data , coverImage: file? file.$id : Post.FEATUREDIMG })

     if(updatedPost){
      navigate(`/post/${updatedPost.$id}`)
     }

    }else{
      const file = await data.image[0]? databaseConfi.uploadFile(data.image[0]) : null
      if(file && file.error){
        setError(file.error)
        return
      }
      const newPost = await databaseConfi.createPost({...data,userID: userData.$id ,coverImage: file? file.$id : null})

      if(newPost){
        navigate(`/post/${newPost.$id}`)

    }
  }

  const slugTransform = useCallback((title) => {
    if(title && typeof title == "string")
      return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
    
    return ''

  })

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if(name == "title"){
        setValue("slug", slugTransform(value.title), {shouldValidate: true})
      }
      return () => subscription.unsubscribe()
    })
  }, [slugTransform, watch, setValue])

  return (
    <form onSubmit={handleSubmit(Post)} className='flex flex-wrap'>
      <div className="w-2/3 px-2">
          <Input
            type="text"
            name="title"
            placeholder="Enter title"
            label="Title"
            {...register("title" , {required: true})}
          />
          <Input
            type="text"
            readonly
            name="slug"
            placeholder="Enter slug"
            label="Slug"
            {...register("slug" , {required: true})}
            oninput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
            }}
          />
          <RTE name="content" label="Content" {...register("content" , {required: true})} />
      </div>
      <div className="w-1/3 px-2">
        {error && <p className="text-red-500 text-2xl text-center">could't create post because {error}</p>}
            <Input
              type="file"
              name="image"
              label="Featured Image"
              {...register("image" , {required: !Post})}
            />
            {Post && (
              <div className='w-full mb-4'>
                <img src={databaseConfi.getFilePreview(Post.FEATUREDIMG)} alt={Post.title} />
              </div>
            )}
            <Select
              name="status"
              label="Status"
              {...register("status" , {required: true})}
              options={["active","inactive"]}
            />
            <Button
            children={Post? "Update Post" : "Create Post"}
            className='w-full'
            type='submit'
            bgColor={Post? "bg-blue-500" : "bg-green-500"}
            />
      </div>
    </form>
  )
 }
}

export default PostForms
import databaseConfi  from '../../appwrite/DatabaseConfi'
import React, {useCallback, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Button , Input , RTE, Select} from '../index'
function PostForms({Post}) {

  const {register, setValue, getValues, watch, control , handleSubmit} = useForm({
    defaultValues: {
      title: Post?.title || "",
      slug: Post?.$id || "",
      Content: Post?.content || "",
      status: Post?.STATUS || "inactive",
      coverImage: Post?.FEATUREDIMG || null
    }
  })
  const [error , setError] = useState("")
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const post = async(data) => {
    
    setError("")
    if(Post){
      const file =  data.image[0]? await databaseConfi.uploadFile(data.image[0]) : null
      if(file) {
        await databaseConfi.deleteFile(Post.FEATUREDIMG).then(() => {
          databaseConfi.updatePost(Post.$id, {title: data.title, status: data.status, content: data.Content, coverImage: file?.$id }).then((updatedPost) => {
            if(updatedPost && updatedPost.error){
              setError(updatedPost.error)
              databaseConfi.deleteFile(file.$id).then(() => console.log("Image deleted"))
              return         
            }
          })
        })
      }else{
        databaseConfi.updatePost(Post.$id, {title: data.title, status: data.status, content: data.Content}).then((updatedPost) => {
          if(updatedPost&& updatedPost.error){
            setError(updatedPost.error)
            return
          }
          if(updatedPost){
            navigate(`/post/${updatedPost.$id}`)
          }
        })
      }

    }else{
      const file = data.image[0]? await databaseConfi.uploadFile(data.image[0]) : null
      if(file && file.error){
        setError(file.error)
        return
      }
      if(file) {
        const fileId = file.$id
        data.coverImage = fileId
        const newPost = await databaseConfi.createPost({title: data.title, slug: data.slug,status: data.status, coverImage: data.coverImage, content: data.Content,userID: userData.$id ,})
        if(newPost && newPost.error){
          setError(newPost.error)
          await databaseConfi.deleteFile(fileId).then(() => console.log("Image deleted"))
          return
        }
        if(newPost){
          navigate(`/post/${newPost.$id}`)
        }
      }
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

  },[])

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if(name == "title"){
        setValue("slug", slugTransform(value.title), {shouldValidate: true})
      }
    })
    return () => subscription.unsubscribe()
  }, [slugTransform, watch, setValue])

  return (
    <form  onSubmit={handleSubmit(post)} className='flex flex-wrap'>
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
            readOnly
            name="slug"
            placeholder="Enter slug"
            label="Slug"
            {...register("slug" , {required: true})}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
            }}
          />
          <RTE control={control} Name="Content" label="Content :" defaultValue={Post? Post.content : getValues("Content")} />
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

export default PostForms
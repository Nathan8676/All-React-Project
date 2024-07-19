import databaseConfi  from '../../appwrite/DatabaseConfi'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Button , Input , RTE, Select} from '../index'
import { updatePost, addPost } from '../../Store/postsSlice'
function PostForms({Post}) {

  const {register, getValues, control, handleSubmit} = useForm({
    defaultValues: {
      title: Post?.title || "",
      slug: Post?.$id || "",
      Content: Post?.content || "",
      status: Post?.STATUS || "inactive",
      coverImage: Post?.FEATUREDIMG || null
    }
  })
  const dispatch = useDispatch()
  const [error , setError] = useState("")
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const post = async(data) => {
    
    setError("")
    if(Post){
      const file =  data.image[0]? await databaseConfi.uploadFile(data.image[0]) : null
      if(file) {
        await databaseConfi.deleteFile(Post.FEATUREDIMG)
       const updatedPost =  dispatch(updatePost(Post.$id,{title: data.title, content: data.Content, status: data.status, coverImage: file.$id}))
        if(updatedPost && updatedPost.error){
          setError(updatePost.error)
          await databaseConfi.deleteFile(file.$id).then(() => console.log("Image deleted"))
          return
        }
        }  
       else{
        dispatch(updatePost({Id:Post.$id,title: data.title, content: data.Content, status: data.status })).then((updatedPost) => {
          if(updatedPost && updatedPost.error){
            setError(updatedPost.error.message || updatedPost.error.toString()) 
            return
          }
          if(updatedPost){
            navigate(`/post/${updatedPost.payload.$id}`)
          }
        })
       }  
    }else {
      const file = data.image[0]? await databaseConfi.uploadFile(data.image[0]) : null
      if(file && file.error){
        setError(file.error)
        return
      }
      if(file) {
        const fileId = file.$id
       dispatch(addPost({title: data.title, content: data.Content, userID: userData.$id, status: data.status , coverImage: fileId})).then((newPost) => {
         if(newPost && newPost.error){
           setError(newPost.error)
           databaseConfi.deleteFile(fileId).then(() => console.log("Image deleted"))
           return
         }
         if(newPost){
           navigate(`/post/${newPost.payload.$id}`)
         }
         
       })
      }
    }
  

}


  // const slugTransform = useCallback((title) => {
  //   if(title && typeof title == "string")
  //     return title
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s+/g, '-')
  //     .replace(/[^\w-]+/g, '')
    
  //   return ''

  // },[])


  return (
    <form  onSubmit={handleSubmit(post)} className='flex flex-wrap'>
      <div className="w-2/3 px-2 max-mobile:w-full">
          <Input
            type="text"
            name="title"
            placeholder="Enter title"
            label="Title"
            {...register("title" , {required: true})}
          />
          
          <RTE control={control} Name="Content" label="Content :" defaultValue={Post? Post.content : getValues("Content")} />
      </div>
      <div className="w-1/3 px-2 max-mobile:w-full">
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
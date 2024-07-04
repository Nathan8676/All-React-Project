import React, { useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import databaseConfi from '../appwrite/DatabaseConfi'
import { Container, Button } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import {FaEdit, FaTrash , FaTruckLoading} from 'react-icons/fa'
import { deletePost } from '../Store/postsSlice'
function Post() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const Posts = useSelector(state => state.posts) 
    const Post = useSelector(state => state.posts.singlePost)
    const [isMobile , setIsMobile] = React.useState(window.innerWidth < 650)
    
    useEffect(() => {
        const handleResize = () => {
          console.log(Post)
            setIsMobile(window.innerWidth < 650)
        } 

        window.addEventListener('resize', handleResize) 

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    } , []) 

    const isAuthor = Post && userData? Post.USERID === userData.$id : false
    const inActiveNotAuthor = Post && Post.STATUS === "inactive" && !isAuthor

    const RemovePost =  () => {
      console.log(Post.FEATUREDIMG)
    dispatch(deletePost( {Id: Post.$id , FEATUREDIMG: Post.FEATUREDIMG})).then(() => {
        console.log("Post deleted")
        navigate('/')
    })
    
    }

if(Posts?.singlePostLoading){ 
  return (
    <div className='py-8 '>
        <Container className='flex justify-center align-center' >
            <FaTruckLoading className='text-4xl text-blue-500 animate-spin center'/>
        </Container>
    </div>
  )
}else{
  return Posts?.singlePostError ? (
    <Container>
        <h2 className=' text-center text-red-600 ' > {Posts.singlePostError} </h2>
    </Container>
  ): Post ? inActiveNotAuthor? (
    <Container>
        <h2 className=' text-center ' >Post is Private</h2>
    </Container>
  ) :  (
    <div className='pb-8 pt-3 px-4'>
    <Container>
     {isAuthor && (
         <div className='w-full flex justify-end'>
             <Link to={`/post/edit/${Post.$id}`}>
             {isMobile?(
                <Button
                children={<FaEdit />}
                bgColor="bg-green-500"
                textColor="text-white"
                type="button"
            />
          ):(
            <Button
            children="Edit"
            bgColor="bg-green-500"
            textColor="text-white"
            type="button"
            />

          )}
             </Link>

          {isMobile?(
             <Button
             children={<FaTrash />}
             bgColor="bg-green-500"
             textColor="text-white"
             type="button"
             onClick={RemovePost}
         />
          ):(
            <Button
            children="Delete"
            bgColor="bg-red-500"
            textColor="text-white"
            type="button"
            onClick={RemovePost}
            />
          )}
         </div>
     )}
      <div className='w-full flex justify-center  rounded-lg border '>
          <img src={databaseConfi.getFilePreview(Post.FEATUREDIMG)} alt={Post.title} className='w-full rounded-lg size-auto' />
      </div>

      <div className='w-full mb-6'>
          <h1 className='text-2xl font-bold'>{Post.title}</h1>
      </div>

      <div className='browser-css'>
          {parse(Post.content)}
      </div>

    </Container>
  </div>
)
  
  : (
    <Container>
        <h2 className=' text-center ' >Post Not Found</h2>
    </Container>
  )


}
}

export default Post

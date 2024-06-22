import React, { useEffect} from 'react'
import { useParams, useNavigate, Link, useLoaderData } from 'react-router-dom'
import parse from 'html-react-parser'
import { Container, Button } from '../components/index'
import databaseConfi from '../appwrite/DatabaseConfi'
import { useSelector } from 'react-redux'
function Post() {
    const userData = useSelector(state => state.auth.userData)
    const Post = useLoaderData()
/*     const Navigate = useNavigate()
  
    
    useEffect(() => {
        if(slug){
            databaseConfi.getPost(slug).then((res) => {
                if(res){
                    setPost(res)
                    console.log('res' ,res)
                }
            })
        }
    } , [slug, Navigate]) */

    const isAuthor = Post && userData? Post.USERID === userData.$id : false
    const inActiveNotAuthor = Post.STATUS === "inactive" && !isAuthor

    const deletePost =  () => {
         databaseConfi.deletePost(Post.$id).then((status) => {
            if(status){
                databaseConfi.deleteFile(Post.FEATUREDIMG)
                    Navigate('/')
            }
         })
    }


  return Post ? inActiveNotAuthor? (
    <Container>
        <h2 className=' text-center ' >Post is Private</h2>
    </Container>
  ) :  (
    <div className='pb-8 pt-3 px-4'>
    <Container>
     {isAuthor && (
         <div className='w-full flex justify-end'>
             <Link to={`/post/edit/${Post.$id}`}>
             <Button
             children="Edit"
             bgColor="bg-green-500"
             textColor="text-white"
             type="button"
             />
             </Link>

             <Button
             children="Delete"
             bgColor="bg-red-500"
             textColor="text-white"
             type="button"
             onClick={deletePost}
             />
         </div>
     )}
      <div className='w-full flex justify-center mb-4 py-2 rounded-lg border'>
          <img src={databaseConfi.getFilePreview(Post.FEATUREDIMG)} alt={Post.title} className='w-full rounded-lg' />
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

export default Post

export const PostLoader = async ({params}) => {
    const {slug} = params
    if(slug){
      const post = await databaseConfi.getPost(slug)
      return post
    }else{
      navigator("/")
    }
}
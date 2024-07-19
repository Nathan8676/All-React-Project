import React, { useState } from 'react'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { postsFetch } from '../Store/postsSlice'
function Home() {
    const isLogin = useSelector(state => state.auth.status)
    const postsSlice = useSelector((state) => state.posts)
    const allPost = postsSlice.AllPost
    const loading = postsSlice.AllPostLoading
    const[error , setError] = useState(postsSlice.AllPostError)
  if(isLogin){
    if(loading){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )  
    }else if(error){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {error}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else {
    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {allPost?.map((post) => (
                    <div key={post.$id} className='p-2 laptop:w-1/4 max-tablet:w-full w-1/2'>
                        <PostCard
                        $id={post.$id}
                        title={post.title}
                        featableImage={post.FEATUREDIMG}
                        />
                    </div>
                ))}
                </div>
            </Container>
        </div>
    )}
  }else {
    return (
        <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="text-2xl font-bold hover:text-gray-500">
              Please Login To See Posts
            </div>
          </div>
        </Container>
      </div>
      
    )
  }
}

export default Home


/* export const HomePostsLoader = () => {
    const dispatch = useDispatch()
    dispatch(postsFetch())
    
} */
import React, {useState} from 'react'
import { Container,PostCard} from '../components'
import { useSelector } from 'react-redux'
function AllPost() {

    const postsSlice = useSelector(state => state.posts)
    const[allPost , setAllPost] = useState(postsSlice.AllPost)
    const[error , setError] = useState(postsSlice.AllPostError)
if(error){
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            {error}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}
  return (
    <div className='w-full py-8' >
        <Container>
            <div className='flex flex-wrap'>
            {allPost?.map((post) => (
                <div key={post.$id} className='p-2 laptop:w-1/4 max-tablet:w-full w-1/2' >
                    <PostCard
                    $id={post.$id}
                    title={post.title}
                    featableImage={post.FEATUREDIMG}
                    />
                </div>
            ))}
            { !allPost && <h2 className=' text-center ' >There is no Post Active</h2>}
            </div>
        </Container>
    </div>
  )
}

export default AllPost



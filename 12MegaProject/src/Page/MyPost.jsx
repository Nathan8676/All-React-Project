import React from 'react'
import databaseConfi from '../appwrite/DatabaseConfi'
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { Container, PostCard, Button } from '../components'

function MyPost() {
  const posts = useSelector(state => state.posts)
  const loading = posts.AllUserPostLoading
  const error = posts.AllUserPostError

  if(error){
    return (
      <Container>
        <h2 className=' text-center text-red-600 ' > {error} </h2>
      </Container>
    )
  }else{
    if(!loading){
        if (!posts.AllUserPost || posts.AllUserPost.length === 0) {
          return (
            <div className="w-full py-8 mt-4 text-center">
              <Container>
                <div className="flex flex-wrap justify-center">
                  <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                      Post your first article
                    </h1>
                    <Link to="/add-post">
                      <Button
                      children="post article"
                      bgColor='bg-green-500'
                      />
                      </Link>
                  </div>
                </div>
              </Container>
            </div>
          )
        } else if(posts.AllUserPostError) {
          return (
            <div className="w-full py-8 mt-4 text-center">
              <Container>
                <div className="flex flex-wrap justify-center">
                  <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                      {posts.AllUserPostError}
                    </h1>
                  </div>
                </div>
              </Container>
            </div>
          )
        } else if(posts.AllUserPost) {
          return (
            <div className="w-full py-8">
              <Container>
                  <h1>Total Post: {posts.AllUserPost?.length}</h1>
                <div className="flex flex-wrap max">
                  {posts.AllUserPost?.map((post) => (
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
          )
        }
        
    }else{
        return (
            <div className="w-full py-8 mt-4 text-center">
              <Container>
                <div className="flex flex-wrap justify-center">
                  <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                      Loading...
                    </h1>
                  </div>
                </div>
              </Container>
            </div>
          )
    }
  }
}

export default MyPost
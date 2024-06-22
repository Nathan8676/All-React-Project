import React from 'react'
import databaseConfi from '../appwrite/DatabaseConfi'
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { Container, PostCard, Button } from '../components'

function MyPost() {
    const [posts, setPosts] = React.useState()
    const  [loading, setLoading] = React.useState(true)
    const userData = useSelector((state) => state.auth.userData)
    React.useEffect(() => {
        setLoading(true)
            databaseConfi.listPosts([Query.equal('USERID', userData.$id)]).then((res) => {
                if(res &&res.error){
                    setPosts(res.error)
                }else if(res.total===0){
                    setPosts([]) 
                }else{
                    setPosts(res)
                }
            })
            .finally(() => setLoading(false))
    }, [])
    if(!loading){
        if (!posts || posts.length === 0) {
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
        } else if(posts && posts.error) {
          return (
            <div className="w-full py-8 mt-4 text-center">
              <Container>
                <div className="flex flex-wrap justify-center">
                  <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                      {posts.error}
                    </h1>
                  </div>
                </div>
              </Container>
            </div>
          )
        } else if(posts) {
          return (
            <div className="w-full py-8">
              <Container>
                  <h1>Total Post: {posts.total}</h1>
                <div className="flex flex-wrap">
                  {posts.documents?.map((post) => (
                    <div key={post.$id}>
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

export default MyPost
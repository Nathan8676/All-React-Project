import React, { useState , useEffect} from 'react'
import { Container, PostCard } from '../components'
import databaseConfi from '../appwrite/DatabaseConfi'
import { Query } from 'appwrite'
function Home() {
    const [posts, setPosts] = useState([]) 
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        databaseConfi.listPosts([Query.equal("STATUS", "active")]).then((res) => {
            if(res){
                setPosts(res.documents)
            }
        })
        .finally(() => setLoading(false))
    },[])
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
    }else{
    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {posts?.map((post) => (
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
    )}
}

export default Home
import React , {useState, useEffect} from 'react'
import { Container,PostCard} from '../components'
import databaseConfi from '../appwrite/DatabaseConfi'
import { useLoaderData } from 'react-router-dom'
function AllPost() {
    const posts = useLoaderData()
  return (
    <div className='w-full py-8' >
        <Container>
            <div className='flex flex-wrap'>
            {posts.documents?.map((post) => (
                <div key={post.$id}>
                    <PostCard
                    $id={post.$id}
                    title={post.title}
                    featableImage={post.FEATUREDIMG}
                    />
                </div>
            ))}
            { !posts && <h2 className=' text-center ' >There is no Post Active</h2>}
            </div>
        </Container>
    </div>
  )
}

export default AllPost


export const AllPostLoader = async () => {
    const posts = await databaseConfi.listPosts()
    return posts
}
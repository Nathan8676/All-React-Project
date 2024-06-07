import React from 'react'
import { Link } from 'react-router-dom'
import databaseConfi from '../appwrite/DatabaseConfi'
function PostCard({$id, title, featableImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-200 rounded-lg p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={databaseConfi.getFilePreview(featableImage)} alt={title}
                className='w-full rounded-lg'
                />
            </div>
            <div className='w-full text-gray-200 font-bold text-2xl'>
                <h2>{title}</h2>
            </div>
        </div>
    </Link>
  )
}

export default PostCard
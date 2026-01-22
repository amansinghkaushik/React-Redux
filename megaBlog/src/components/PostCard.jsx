import React from 'react'
import appWriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, tittle, featuredImage}) {
  return (
    <Link to = "/post/${$id}">
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <img src={appWriteService.getFilePreview(featuredImage)} 
            alt="Preview" 
            className='rounded-xl'/>
        </div>
        <h2
        className='text-xl font-bold'>{tittle}</h2>
    </Link>
  )
}

export default PostCard
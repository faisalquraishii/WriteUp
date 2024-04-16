import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

//Rendered in AddPost.jsx and Home.jsx
function PostCard({$id, title, featuredImage}) { //$id --> post id, featuredImage --> image id
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className='rounded-xl' />

                </div>
                <h2
                className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
        /*By using Link, the whole card is made clickable. 
        Also the full URL need not be given to the 'to' prop when using Link--> The new URL will
        be relative to the current location.
        */
    )
}


export default PostCard
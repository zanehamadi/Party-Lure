import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import './PostDetails.css'

const PostDetails = ({post}) => {
    const roles = useSelector(state => state.roles)

    return(roles &&
        <div className = 'detail-container'>
        <div className = 'top'>
            <h1>
                <Link to ={`/posts/${post.id}`} >
                {post.title}
                </Link>
            </h1>
            <h2>
                {post.activity}
            </h2>
            <h2>
                <Link to = {`/users/${post.user_id}`}>
                   {post.user}
                </Link>
            </h2>
        </div>
        <div className = 'bottom'>
            <h3>
            Level: {post.recruit_level}
            </h3>
            <div className = 'wanted-roles'>
                {post?.recruit_role && post?.recruit_role.map(role => {
                    console.log(role)
                         if(role){return(

                    <img className = 'role-icon' src = {roles[`${role}`].icon_url} />)}
                })}
            </div>
        </div>
    </div>
    )
}

export default PostDetails

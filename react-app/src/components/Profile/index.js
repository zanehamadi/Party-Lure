import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile({users, posts, parties}){
    
    const {id} = useParams()
    const user = users?.find(specUser => +specUser.id === +id)
    const userPosts = posts?.filter(revPosts => +revPosts.user_id === +id)



    return(
    <>
        {console.log(parties)}
        {console.log(user)}
        <h1>
            {`${user?.username}'s Profile`}
        </h1>
        <div>
            {`Job: ${user?.job}`}
        </div>
        <div>
            {`Level: ${user?.level}`}
        </div>
        <div>
            {`Role: ${user?.role}`}
        </div>

        <h2>Posts</h2>
        {userPosts.map(post => 
            <>
            <div>
                {post.title}
            </div>
            </>
        )}
    </>
    )
}
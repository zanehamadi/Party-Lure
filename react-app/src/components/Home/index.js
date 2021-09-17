import React from "react";
import Splash from "../Splash";
import { Link } from "react-router-dom";
import PostDetails from "../Posts/PostDetails"
import '../Posts/PostsPage.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getActivePosts } from "../../store/posts";
import { useState } from "react";


function Home({ sessionUser, authenticated }) {

    const dispatch = useDispatch()
    let [activePosts, setActivePosts] = useState()


    useEffect( () => {
        
        const fetchData = async () => {
            let dispatchPosts = await dispatch(getActivePosts())
            console.log("dispatch_POSTS", dispatchPosts)
            setActivePosts(dispatchPosts)
        }
        fetchData()
    }, [dispatch])

    return (
        <>
            <div className = 'posts-container'>
                {activePosts?.posts && activePosts?.posts.map(post =>{
                    if(Object.keys(post).length > 0){
                    return(
                    <PostDetails post = {post} />)}
                    })}
            </div>
        </>
    )
}

export default Home

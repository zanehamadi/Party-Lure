import React from "react";
import Splash from "../Splash";
import PostDetails from "../Posts/PostDetails"
import '../Posts/PostsPage.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getActivePosts } from "../../store/posts";
import { useState } from "react";
import "./Home.css"


function Home({ sessionUser, authenticated }) {

    const dispatch = useDispatch()
    let [activePosts, setActivePosts] = useState()

    useEffect(() => {

        const fetchData = async () => {
            let dispatchPosts = await dispatch(getActivePosts())

            setActivePosts(dispatchPosts)
        }
        fetchData()
    }, [dispatch])


    return (
        authenticated ?
            <>
                <div className='home-container'>
                    <h1 id="welcome-text">Welcome back, <span id="username">{sessionUser?.username}</span>. <div> Here's some parties you may be interested in:</div></h1>
                    <div className='posts-container'>{activePosts?.posts && activePosts?.posts.map(post => {
                        if (Object.keys(post).length > 0) {
                            return (
                                <PostDetails post={post} />
                            )
                        }
                        return []
                    })}
                    </div>
                </div>

            </>
            :
            <Splash />
    )
}

export default Home

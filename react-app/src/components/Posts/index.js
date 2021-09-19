
import PostDetails from "./PostDetails"
import './PostsPage.css'

export default function Posts({ posts }) {
    return (
        <>
            <div className = 'posts-container'>
                {posts.map(post =>{
                    if(Object.keys(post).length > 0){
                    return(
                    <PostDetails post = {post} />)}
                    })}
            </div>
        </>
    )
}

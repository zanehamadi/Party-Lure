
import PostDetails from "./PostDetails"
import './PostsPage.css'

export default function Posts({ posts }) {
    return (
        <>
            <div className='posts-container'>
                {posts.map(post => {
                    if (post.comments) {

                        return (
                            <PostDetails post={post} />)
                    }
                })}
            </div>
        </>
    )
}

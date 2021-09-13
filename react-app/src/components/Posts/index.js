import { Link } from "react-router-dom";

export default function Posts({ posts }) {
    return (
        <>
            <div>
                {posts.map(post =>
                    <div key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
                )}
            </div>
        </>
    )
}

import { Link } from "react-router-dom";

export default function Comments({ comments }) {
    return (
        <>
        {console.log("COMMENTS", comments[1])}
            {/* <div>
                {comments.map(comment =>
                    <div key={comment.id}><Link to={`/comments/${comment.id}`}>{comment.content}</Link></div>
                )}
            </div> */}
            <ul>
            {comments.map (comment => 
                <li>{comment.content}</li>
            )}
            </ul>
        </>
    )
}
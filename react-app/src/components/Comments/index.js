import { Link } from "react-router-dom";
import CreateCommentForm from "./commentForm";


export default function Comments({ comments }) {
    return (
        <>
           
            <CreateCommentForm/>
            {/* <ul>
                {comments.map (comment => 
                    <li>{comment.content}</li>
                )}
            </ul> */}
        </>
    )
}

import { useParams } from 'react-router';
import CreateCommentForm from '../Comments/commentForm';
import { thunk_fetchPostComments } from '../../store/comments';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Post({ posts, comments }) {
    const { id } = useParams();
    const post = posts?.find(post => post.id === +id)
    let userComments = comments?.filter((comment) => comment?.post_id === post?.id)


    return (
        <>
            <div>
                {post?.content}
            </div>
            <div>
                <button>Request to Join</button>
                <button>Cancel Request</button>
                <button>Edit Post</button>
                <button>Delete Post</button>
                <div>
                    <CreateCommentForm post={post}/>
                </div>
            </div>
            <div>
                {userComments.map(comment=>
                    <div key={comment?.id}><Link to={`/comments/${comment?.id}`}>{comment.content}</Link></div>
                )}
                
            </div>
        </>
    )
}


import { useSelector } from 'react-redux';
import EditCommentFormModal from './editCommentModal';
import { Link } from 'react-router-dom';

export default function Comment({comment}) {

    const user = useSelector(state => state.session.user)
    const userId = user?.id

    const ownsComment = (comment) => {
        if (comment?.user_id === userId) {
            return true
        }
    }

    return (
        <>
        <div key={comment?.id} className="commentContainer">
        <div id="picNamePost">
            <img src={comment.profile_url} className="commentPP" alt="profile url"/>
            <Link to={`/users/${comment?.user_id}`}><button id="usernamePrev">{comment.username}</button></Link>
            <span id="datePrev">{comment?.created_at}</span>
        {user && ownsComment(comment) &&
            <EditCommentFormModal comment={comment} />
        }
        </div>
        <span id="commentContent">{comment.content}</span>
        </div>
        </>
    )
}

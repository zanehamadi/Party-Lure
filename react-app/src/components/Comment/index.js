import { useParams } from 'react-router';
import { useEffect } from 'react';
import EditCommentForm from './editCommentForm';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../../store/comments';
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

    // useEffect(() => {
    //     dispatch(getComment(id));
    // }, [id, dispatch]);
    // const handleClick = () => {
    //     hideEdit = !hideEdit
    //     hideDelete = !hideDelete
    // }

    return (
        <>
        <div key={comment?.id} className="commentContainer postPage">
        <div id="picNamePost">
            <img src={comment.profile_url} className="commentPP" />
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

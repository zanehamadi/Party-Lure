import { useParams } from 'react-router';
import { useEffect } from 'react';
import EditCommentForm from './editComment';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../../store/comments';

export default function Comment({ comments, post }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const comment = comments?.find(comment => comment.id === +id)

    const user = useSelector(state=>state.session.user)
    const userId = user?.id

    let hideEdit = true
    let hideDelete = true

    if (comment?.user_id === userId) {
        hideEdit = false
        hideDelete = false
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
            <div>
                {comment?.content}
            </div>
            {/* <button>Edit Post</button>
            <button>Delete Post</button> */}
            <div hidden={hideEdit}>
                <EditCommentForm comment={comment} post={post} hideEdit={hideEdit} hideDelete={hideDelete}/>
            </div>
        </>
    )
}
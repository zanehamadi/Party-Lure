import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';

import { createNewComment } from '../../store/comments';

const CreateCommentForm = ({post}) => {
    const postId = post?.id
    const user = useSelector(state=>state.session.user)
    const userId = user?.id
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState("");
    const updateComment = (e) => setContent(e.target.value);


    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const payload = {
            content,
            user_id:userId,
            post_id:postId
        };
        let createdComment = await dispatch(createNewComment(payload))
        if (createdComment) {
            history.push(`/comments`);
            reset()
        }
    };

    const reset = () => {
        setContent("")
    }

    return (
        <form  onSubmit={handleSubmit} hidden={false}>
            <input
                type="text"
                placeholder="Type comment here"
                value={content}
                onChange={updateComment} />
            <button className="edit-btn edit5" type="submit">Create Comment</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
    </form>
    )
}

export default CreateCommentForm;
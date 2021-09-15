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
    const [validations, setValidations] = useState([])
    const updateComment = (e) => setContent(e.target.value);


    useEffect(() => {

        let valid = []
        
        if(content.length > 200) valid.push('Comment too long(200 character limit.)')
        if(content.length <= 0) valid.push('Please add a valid comment(Comment too short)')
        setValidations(valid)


    }, [content])


    const handleSubmit = async (e) => {
        e.preventDefault();

        setContent("")
        const payload = {
            content,
            user_id:userId,
            post_id:postId
        };
        let createdComment = await dispatch(createNewComment(payload))
        if (createdComment) {
            history.push(`/comments`);
        }

    };


    return (
        <form  onSubmit={handleSubmit} hidden={false}>
            {validations ? 
                <>
                    <ul>
                        {validations.map(validation => <li>{validation}</li>)}
                    </ul>
                </> 
            : 
            <></>}
            <input
                type="text"
                placeholder="Type comment here"
                value={content}
                onChange={updateComment} />
            <button className="edit-btn edit5" type="submit" disabled={validations.length > 0}>Create Comment</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
    </form>
    )
}

export default CreateCommentForm;
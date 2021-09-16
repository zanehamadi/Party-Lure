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
    const [showValidations, setShowValidations] = useState([])
    const updateComment = (e) => setContent(e.target.value);


    console.log(content.length)
    useEffect(() => {

        let valid = []
        setShowValidations([])
        
        if(+content.length >= 200) valid.push('Comment too long(200 character limit.)')
        if(+content.length <= 0) valid.push('Please add a valid comment(Comment too short)')
        setValidations(valid)
        console.log('VALID', valid)

    }, [content])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('VALIDATION', validations.length)
        if(!validations.length > 0 ){
            console.log('NO VALIDATION ERRORS')
            setContent("")
            setValidations([])
            const payload = {
                content,
                user_id:userId,
                post_id:postId
            };
            let createdComment = await dispatch(createNewComment(payload))
            if (createdComment) {
                history.push(`/comments`);
            }
        }
        setShowValidations(validations)
    };


    return (
        <form  onSubmit={handleSubmit} hidden={false}>
            <div className="commentForm postPage">
                {showValidations ? 
                    <>
                        <ul>
                            {showValidations.map(validation => <li>{validation}</li>)}
                        </ul>
                    </> 
                : 
                <></>}
                <textarea 
                    placeholder="Type comment here"
                    value={content}
                    onChange={updateComment} />
                <button className="edit-btn edit5" type="submit" disabled={showValidations.length > 0}>Create Comment</button>
            </div>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
    </form>
    )
}

export default CreateCommentForm;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';

import { createNewComment } from '../../store/comments';
import ButtonStyle from '../Button/ButtonStyle';

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

    useEffect(() => {

        let valid = []
        setShowValidations([])

        if(+content.length >= 200) valid.push('Comment too long(200 character limit.)')
        if(+content.length <= 0) valid.push('Please add a valid comment(Comment too short)')
        setValidations(valid)

    }, [content])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validations.length > 0 ){

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
            <div className="commentForm">
                {showValidations ?
                    <>
                        <ul className="val-container2">
                            {showValidations.map(validation => <li className="val-error">{validation}</li>)}
                        </ul>
                    </>
                :
                <></>}
                <textarea
                    placeholder="Type comment here"
                    value={content}
                    onChange={updateComment}
                    className="commentTextArea"
                />
                <ButtonStyle>
                    <button className="edit-btn edit5 commentButton styled-button" type="submit" disabled={showValidations.length > 0}>Create Comment</button>
                </ButtonStyle>
            </div>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
    </form>
    )
}

export default CreateCommentForm;

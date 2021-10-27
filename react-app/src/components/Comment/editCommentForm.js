import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_editComment, thunk_deleteComment } from '../../store/comments';
import "./editComment.css"
import { useEffect } from 'react';


const EditCommentForm = ({ comment, post, closeModal }) => {


    const user = useSelector(state => state.session.user)
    const userId = user?.id
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState(comment.content || "");
    const updateContent = (e) => setContent(e.target.value);
    const [validations, setValidations] = useState([])
    const [showValidations, setShowValidations] = useState([])

     useEffect(() => {

        let valid = []
        setShowValidations([])

        if(+content.length >= 200) valid.push('Comment too long(200 character limit.)')
        if(+content.length <= 0) valid.push('Please add a valid comment(Comment too short)')
        setValidations(valid)

    }, [content])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validations.length > 0) {
            const payload = {
                ...comment,
                content: content,
                user_id: userId,
            };
            await dispatch(thunk_editComment(payload));
            closeModal()
            history.push(`/posts/${payload?.post_id}`)
        }
        setShowValidations(validations)
    };

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(thunk_deleteComment(comment?.id))
        history.push(`/posts/${comment?.post_id}`)
    }

    return (
        <section className="create-post-form">
            <div>
                <form className='form-group' onSubmit={handleSubmit}>
                    {showValidations ?
                    <>
                        <ul className="val-container">
                            {showValidations.map(validation => <li className="val-error">{validation}</li>)}
                        </ul>
                    </>
                :
                <></>}
                    <label htmlFor='edit'>Edit: </label>
                    <input
                        type="text"
                        placeholder="Enter comment change"
                        value={content}
                        onChange={updateContent}
                        className='form-control' />
                    <button className="formRequestButtons" type="submit">Submit Edit</button>
                </form>
            </div>
            <div className='form-group'>
                <form onSubmit={handleDelete}>
                    <button className="formRequestButtons" id="del-comment" type="submit">Delete Comment</button>
                </form>
            </div>
        </section>
    );
};

export default EditCommentForm;

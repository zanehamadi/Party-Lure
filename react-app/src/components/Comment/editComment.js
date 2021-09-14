import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_editComment, thunk_deleteComment } from '../../store/comments';


const EditCommentForm = ({comment, post, hideEdit, hideDelete}) => {

    const postId = post?.id
    const user = useSelector(state=>state.session.user)
    const userId = user?.id
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState("");
    const updateContent = (e) => setContent(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

    const payload = {
        ...comment,
        content:content,
        user_id:userId,
    };
    console.log("PAYLOAD", payload)

    
    let updatedComment = await dispatch(thunk_editComment(payload));
    
    if (updatedComment) {
        history.push(`/posts/${payload?.post_id}`)
        console.log("SUCCESS EDIT")
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(thunk_deleteComment(comment?.id))
        // history.push(`/posts/${payload?.post_id}`)
    }


    return (
        <section className="editContainer">
            <div>
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="your edit. . ."
                    value={content}
                    onChange={updateContent}/>
                <button  hidden={hideEdit} type="submit">Submit Edit</button>
                </form>
            </div>
            <div>
                <form onSubmit={handleDelete}>
                <button className="del-btn" hidden={hideDelete} type="submit">Delete Comment</button>
                </form>
            </div>
        </section>
    );
};

export default EditCommentForm;
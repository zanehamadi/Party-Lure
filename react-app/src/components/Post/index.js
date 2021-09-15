import { useParams, useHistory } from 'react-router';
import CreateCommentForm from '../Comments/commentForm';
import { thunk_fetchPostComments } from '../../store/comments';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Modal } from "../../context/Modal";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {goDeletePost} from "../../store/posts"



export default function Post({ posts, comments, users }) {
    const { id } = useParams();
    const post = posts?.find(post => post.id === +id)
    let userComments = comments?.filter((comment) => comment?.post_id === post?.id)
    const dispatch = useDispatch()
    const history = useHistory()
    const session = useSelector(state => state.session)
    const loggedUser = session?.user
    const yourPost =  loggedUser ? loggedUser.id === post?.user_id : false
    console.log("USER COMMENT LIST", userComments)

    // useEffect(() => {
    //     userComments = comments?.filter((comment) => comment?.user_id === post?.id)
    // }, [comments])


    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const deletePostFunc = (id) => {
        dispatch(goDeletePost(id))
        history.push('/')
    }



    return (
        <>
            <div>
                {post?.content}
            </div>
            <div>
                <button>Request to Join</button>
                <button>Cancel Request</button>
                {yourPost ? <>
                <button>Edit Post</button>
                <button onClick={handleClick}>Delete Post</button>
                {showModal ? 
                    <Modal onClose={() => setShowModal(false)}>
                        <span>Are you sure you want to delete this post? </span>
                        <button onClick={() => deletePostFunc(id)}>Yup 🐡 </button>
                        <button onClick={closeModal}>Nevermind</button>
                    </Modal> 
                : <></>}
                </>
                : 
                <></>}
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

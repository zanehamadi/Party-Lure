import { useParams, useHistory } from 'react-router';
import CreateCommentForm from '../Comments/commentForm';
import EditPostForm from '../Posts/EditPostForm';
import Comment from '../Comment';
import { goDeletePost } from '../../store/posts';
import EditCommentFormModal from '../Comment/editCommentModal';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelPartyRequest, getSentRequests, sendPartyRequest } from '../../store/party_request';
import { Modal } from "../../context/Modal";
import './post.css'


export default function Post({ comments, parties }) {
    const history = useHistory()
    const aTypeSlice = useSelector(state => state.activityTypes)
    const activitySlice = useSelector(state => state.activities)
    const rolesSlice = useSelector(state => state.roles)
    const postsSlice = useSelector(state => state.posts)

    const activityTypes = Object.values(aTypeSlice)
    const activities = Object.values(activitySlice)
    const roles = Object.values(rolesSlice)
    const posts = Object.values(postsSlice)

    const [hasRequested, setHasRequested] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user?.id)
    const { id } = useParams();

    const post = posts?.find(post => post.id === +id)
    const party = parties?.find(party => party.post_id === +id)

    let postsComments = comments?.filter((comment) => comment?.post_id === post?.id)

    const session = useSelector(state => state?.session)
    const sessionUser = useSelector(state => state.session?.user)
    const isLogged = session?.user ? true : false
    const isUser = session?.user ? session?.user.id === post?.user_id : false

    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isPartyFull, setIsPartyFull] = useState(false)



    const deleteFunc = () => {
        dispatch(goDeletePost(id));
        history.push('/')
    }
    const handleClickEdit = () => {
        setShowEditModal(true)
    }
    const handleClickDelete = () => {
        setShowDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false)
    }
    const closeEditModal = () => {
        setShowEditModal(false)
    }



    useEffect(() => {
        if (userId) {

            dispatch(getSentRequests(userId))
        }
    }, [userId, hasRequested])

    let currentUserRequestsState = useSelector(state => state?.requests?.sent)

    let currentUserRequests = Object.values(currentUserRequestsState)

    // useEffect(() => {
    //     userComments = comments?.filter((comment) => comment?.user_id === post?.id)
    // }, [comments])

    const checkMember = () => {
        let currentParty = party?.users
        for (let member of currentParty) {
            if (member.id === userId) {
                return true
            }
        }
        return false
    }
    const checkParty = () => {
        let currentParty = party?.users

        if (currentParty.length >= 4) {

            return true
        }

        return false

    }
    useEffect(() => {
        if (party) {
            setIsMember(checkMember())
            setIsPartyFull(checkParty())
        }
    }, [party])
    const doesUserHaveRequest = () => {
        if (currentUserRequests.length > 0) {

            for (let sentReq of currentUserRequests) {

                if (sentReq.id === party.id) {
                    return true
                }
            }
        }
        return false
    }

    useEffect(() => {
        if (currentUserRequests[0] && party) {
            setHasRequested(doesUserHaveRequest())
        }

    }, [party])




    const cancelRequest = () => {
        if (userId) {
            dispatch(cancelPartyRequest(userId, party.id))
        }
        setHasRequested(false)
    }


    const requestToJoin = () => {
        dispatch(sendPartyRequest(userId, party.id))
        setHasRequested(true)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(goDeletePost(post?.id))
        history.push(`/posts/${post?.post_id}`)
    }

    return (
        <div className="postPage">
            {console.log(party)}
            <h1 className="postTitle postPage">
                {post?.title}
            </h1>
            <div className="postBody postPage">
                {post?.content}
            </div>

            <div className="partyContainer">
                {party?.users?.map(user =>
                    <div className="pMemberContainer">
                        <div> <img src={user.profile_url} width="100" height="100" /> </div>
                        <div>{`User: ${user.username} `}</div>
                        <div>{`Level: ${user.level} `}</div>
                        <div>{`Role: ${user.role}`}</div>
                        <div><img src={user.role_url} /> </div>
                        <div>{`Job: ${user.job}`}</div>
                    </div>
                )}

            </div>




            <div >
                {!isPartyFull && !isUser && !hasRequested && isLogged && party && <button onClick={requestToJoin} className="requestButtons">Request to Join</button>}
                {hasRequested && <button onClick={cancelRequest} className="requestButtons">Cancel Request</button>}
                {isUser ?
                    <>

                        {showEditModal ?
                            <Modal onClose={() => setShowEditModal(false)}>
                                <EditPostForm posts={posts} roles={roles} activityTypes={activityTypes} activities={activities} />
                                <button onClick={closeEditModal}>
                                    Cancel
                                </button>
                            </Modal>
                            : <></>}

                        <div id="userButtons">
                            <button onClick={handleClickEdit} className="userButton">Edit Post</button>
                            <button onClick={handleClickDelete} className="userButton">Delete Post</button>
                        </div>
                        {showDeleteModal ?
                            <Modal onClose={() => setShowDeleteModal(false)}>
                                <span>Are you sure you want to delete this post?</span>
                                <button onClick={deleteFunc}>
                                    Yes 🐡
                                </button>
                                <button onClick={closeDeleteModal}>
                                    No
                                </button>
                            </Modal>
                            : <></>}
                    </>
                    :
                    <></>
                }
                {isLogged ?

                    <>
                        <div>
                            <CreateCommentForm post={post} />
                        </div>
                    </>
                    :
                    <></>}
            </div>

            <div className='comment-container'>
                {postsComments.map(comment =>
                    <div>
                        <Comment comment={comment} />
                    </div>
                )}

            </div>
        </div>
    )
}

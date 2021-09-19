import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getReceivedRequests, getSentRequests } from "../../store/party_request";
import { getOneUser } from "../../store/session";
import { getUserPosts } from "../../store/posts";
import { Modal } from "../../context/Modal";
import EditProfileForm from "./EditProfile";
import UserParties from "./UserParties";
import './Profile.css'
import ButtonStyle from "../Button/ButtonStyle";
import PostDetails from "../Posts/PostDetails";

export default function Profile({ users, parties, roles, jobs }) {

    const dispatch = useDispatch()
    const { id } = useParams()

    const [owner, setOwner] = useState(false)
    const [focus, setFocus] = useState('Parties')
    const [showEditModal, setShowEditModal] = useState(false)

    useSelector(state => state.requests)
    const user = useSelector(state => state.session.profile)
    const viewId = useSelector(state => state.session?.user?.id)

    const userParties = parties?.filter(revParties => +revParties.owner_id === +id)
    const userPostsState = useSelector(state => state.posts?.userPosts)
    const userPosts = Object.values(userPostsState)

    useEffect(() => {

        if (id == viewId) {
            dispatch(getReceivedRequests(id))
            dispatch(getSentRequests(id))
            setOwner(true)
            return
        }
        return(setOwner(false))
    }, [dispatch, id, viewId])

    useEffect(() => {
        if (id) {
            dispatch(getOneUser(id))
            dispatch(getUserPosts(id))
            return
        }
    }, [id])

    const handleFocus = (focus) => {
        setFocus(focus)
    }

    const handleClickEdit = () => {
        setShowEditModal(true)
    }
    const closeEditModal = () => {
        setShowEditModal(false)
    }

    return (
        <div className='profile-page'>
            <div className='profile-header'>
                <div className = 'personal-info'>
                <h1 className = 'profile-username'>
                    {`${user?.username}`}
                </h1>
                <img className='profile-pic' src={user?.profile_url} width={300} height={300} />
                <>
                    {user && user.id === viewId &&
                        <ButtonStyle>
                        <button className = 'styled-button' onClick={handleClickEdit}>
                            Edit
                            </button>
                            </ButtonStyle>
                    }
                    {
                        showEditModal ?
                            <Modal onClose={() => setShowEditModal(false)}>
                                <EditProfileForm jobs={jobs} closeEditModal={closeEditModal} />
                                <button id="cancel-edit-profile" onClick={closeEditModal}>
                                    Cancel
                                </button>
                            </Modal>
                            : <></>}
                </>
                </div>
                <div className='game-info'>
                    <div>
                        Role: <img src={user?.role_url} width={24} height={24} /> {`${user?.role}`}
                    </div>
                    <div>
                        Job: {`${user?.job}`}
                    </div>
                    <div>
                        {`Level: ${user?.level}`}
                    </div>
                </div>

            </div>
            <div className='tab-bar'>
                <div onClick={() => handleFocus('Parties')}>Parties</div>
                <div onClick={() => handleFocus('Friends')}>Friends</div>
            </div>
            <div className='focus-content'>
                {focus === 'Parties' &&
                    < UserParties parties={userParties} owner={owner} username={user?.username} />
                }
                {focus === 'Friends' &&
                    <div id="memeImgContainer">
                        <img src='https://memegenerator.net/img/instances/50150131/heres-where-id-put-my-friends-if-i-had-any.jpg' id="memeFriendPic"></img>
                    </div>
                }
            </div>
            <h2>Posts</h2>
            {
                userPosts && userPosts.map(post =>
                    <div key = {post.id}>
                        <PostDetails post = {post}/>
                    </div>
                )
            }
        </div >
    )
}

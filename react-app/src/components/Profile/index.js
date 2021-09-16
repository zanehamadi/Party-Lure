import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getRecievedRequests, getSentRequests } from "../../store/party_request";
import PartyCounter from "./PartyCounter";
import ProfileRecievedRequests from "./ProfileReceivedRequests";
import ProfileSentRequests from "./ProfileSentRequests";
import RecievedRequest from "./RecievedRequest";
import { Link } from "react-router-dom";
import { getOneUser } from "../../store/session";
import { getUserPosts } from "../../store/posts";


export default function Profile({ users, parties, roles }) {

    const dispatch = useDispatch()
    const { id } = useParams()
    const [owner, setOwner] = useState(false)
    // const user = users?.find(specUser => +specUser.id === +id)
    // const userPosts = posts?.filter(revPosts => +revPosts.user_id === +id)
    const userParties = parties?.filter(revParties => +revParties.owner_id === +id)

    console.log('THIS IS ROLES ------>', roles)
    let viewId = useSelector(state => state.session?.user?.id)
    useEffect(() => {
        if (id == viewId) {
            dispatch(getRecievedRequests(id))
            dispatch(getSentRequests(id))
            setOwner(true)
            return
        }
        return
    }, [dispatch, id,viewId])

    useEffect(() => {
        if (id) {
            dispatch(getOneUser(id))
            dispatch(getUserPosts(id))
            return
        }
    }, [id])

    let userPostsState = useSelector(state => state.posts?.userPosts)
    let user = useSelector(state => state.session.profile)

    // let userPosts

    // useEffect(() => {
    //     if(userPostsState){
    //         userPosts= Object.values(userPostsState)
    //         console.log('user posts', userPosts)
    //     }
    // }, [])
    const sentRequestState = useSelector(state => state.requests.sent)
    const receivedRequestState = useSelector(state => state.requests.recieved)

    let sentRequests = Object.values(sentRequestState)
    let recievedRequests = Object.values(receivedRequestState)

    let userPosts = Object.values(userPostsState)

    return (
        <>
            <h1>
                {`${user?.username}'s Profile`}
            </h1>
            <img src={user?.profile_url} width={300} height={300} />
            <>
                <div>
                    Job: <img src={user?.role_url} width={24} height={24} /> {`${user?.job}`}
                </div>
                <div>
                    {`Level: ${user?.level}`}
                </div>
                <div>
                    Role: <img src={user?.role_url} width={24} height={24} /> {`${user?.role}`}
                </div>
            </>
            <h2>Posts</h2>
            {userPosts && userPosts.map(post =>
                <div>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </div>
            )}

            <h2>Parties</h2>
            {userParties.map(parties =>
                <>
                    <div>
                        <h3>{`Party Name: ${parties?.title}`}</h3>
                        <h4>Members:</h4>
                        {parties.users.map(user =>
                            <div>{`${user.username}`}<img src={user?.role_url} width={24} height={24} />{`${user.job}, Level: ${user.level}`}</div>
                        )}
                    </div>
                    <div>
                        <PartyCounter requests={parties.requests} />
                    </div>
                </>
            )}
            {owner &&
            <div>
            <h2>Recieved Requests</h2>
            {recievedRequests && recievedRequests.map(req => {
                return (
                    <ProfileRecievedRequests key={req.id} partyId={req.id} requests={req.requests} />
                )
            })}
            <h2>Sent Requests</h2>
            {sentRequests && sentRequests.map(req => {
                return (
                    <ProfileSentRequests key={req.id} partyName={req.title} partyId={req.id} requests={req.requests} />
                )
                })

            } </div>}
        </>
    )
}

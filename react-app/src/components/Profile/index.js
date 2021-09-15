import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getRecievedRequests, getSentRequests } from "../../store/party_request";
import ProfileRecievedRequests from "./ProfileReceivedRequests";
import ProfileSentRequests from "./ProfileSentRequests";
import RecievedRequest from "./RecievedRequest";

export default function Profile({users, posts, parties}){
    const dispatch = useDispatch()
    const {id} = useParams()
    const user = users?.find(specUser => +specUser.id === +id)
    const userPosts = posts?.filter(revPosts => +revPosts.user_id === +id)
    const userParties = parties?.filter(revParties => +revParties.owner_id === +id)

    useEffect(() => {
        if(id){
        console.log('HERE', id)
        dispatch(getRecievedRequests(id))
        dispatch (getSentRequests(id))
        return
        }
        return
    },[dispatch,id])

    const sentRequestState = useSelector(state => state.requests.sent)
    const receivedRequestState = useSelector(state => state.requests.recieved)

    let sentRequests = Object.values(sentRequestState)
    let recievedRequests = Object.values(receivedRequestState)

    return(
    <>
        {console.log('PARTIES', userParties)}
        <h1>
            {`${user?.username}'s Profile`}
        </h1>
        <div>
            {`Job: ${user?.job}`}
        </div>
        <div>
            {`Level: ${user?.level}`}
        </div>
        <div>
            {`Role: ${user?.role}`}
        </div>

        <h2>Posts</h2>
        {userPosts.map(post =>
            <>
            <div>
                {post.title}
            </div>
            </>
        )}

        <h2>Parties</h2>
        {userParties.map(parties =>
            <>
                <div>
                    {parties?.title}
                </div>
            </>
        )}
        <h2>Recieved Requests</h2>
        {recievedRequests && recievedRequests.map(req => {
            return (
                <ProfileRecievedRequests key = {req.id} partyId={req.id} requests = {req.requests}  />
            )
        }) }
        <h2>Sent Requests</h2>
        {sentRequests && sentRequests.map(req => {
            return (
                <ProfileSentRequests  key = {req.id} partyName = {req.title} partyId={req.id} requests = {req.requests} />
            )
        })}
    </>
    )
}

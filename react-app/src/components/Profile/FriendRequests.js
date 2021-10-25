import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { goGetReceivedFriendRequests, goGetSentFriendRequests } from "../../store/friend_requests"
import SentFriendRequests from "./SentFriendRequests"
import ReceivedFriendRequests from "./ReceivedFriendRequests"

const FriendRequests = () => {

    const dispatch = useDispatch()

    const [sentRequests, setSentRequests] = useState([])
    const [receivedRequests, setReceivedRequests] = useState([])
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        if(user){
            dispatch(goGetReceivedFriendRequests(user.id))
            dispatch(goGetSentFriendRequests(user.id))
        }
    }, [user])

    let sentRequestsObj = useSelector(state => state.friendRequests.sent)
    let receivedRequestsObj = useSelector (state => state.friendRequests.received)


    useEffect(() => {
        if(sentRequestsObj){
            setSentRequests([...Object.values(sentRequestsObj)])
        }

        if(receivedRequestsObj){
            setReceivedRequests([...Object.values(receivedRequestsObj)])
        }
    }, [receivedRequestsObj, sentRequestsObj])


    return (
        <div>
            <ReceivedFriendRequests requests = {receivedRequests}/>
            <SentFriendRequests requests = {sentRequests} />
        </div>
    )
}


export default FriendRequests

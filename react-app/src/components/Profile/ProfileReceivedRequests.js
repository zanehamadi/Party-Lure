import { useSelector } from "react-redux"
import RecievedRequest from "./RecievedRequest"

const ProfileRecievedRequests = ({requests, partyId}) =>{

    useSelector(state => state.requests)

    return(
        <>
        {requests && requests.map( req => {
            return (
                <RecievedRequest username={req.username} partyId = {partyId} userId = {req.id}  />
            )
        })}
        </>
    )
}

export default ProfileRecievedRequests

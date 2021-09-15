import { useSelector } from "react-redux"
import RecievedRequest from "./RecievedRequest"

const ProfileRecievedRequests = ({requests, partyId}) =>{

    useSelector(state => state.requests)

    return(
        <ul>
        {requests && requests.map( req => {

            return (
                <li>
                <RecievedRequest key={req.id} username={req.username} partyId = {partyId} userId = {req.id}  />
                </li>
            )
        })}
        </ul>
    )
}

export default ProfileRecievedRequests

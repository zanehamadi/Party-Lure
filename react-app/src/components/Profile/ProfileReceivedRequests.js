import { useSelector } from "react-redux"
import ReceivedRequest from "./ReceivedRequest"

const ProfileReceivedRequests = ({ requests, partyId }) => {
    useSelector(state => state.requests.recieved)

    return (
        <ul>
            {requests && requests.map(req => {

                return (
                    <li>
                        <ReceivedRequest key={req.id} username={req.username} partyId={partyId} userId={req.id} />
                    </li>
                )
            })}
        </ul>
    )
}

export default ProfileReceivedRequests

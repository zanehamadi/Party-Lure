import { useSelector } from "react-redux"
import SentRequest from "./SentRequest"

const ProfileSentRequests = ({ requests, userId }) => {

    useSelector(state => state.requests)


    const checkRequests = (requestsArray) => {
        for (let requests of requestsArray) {

            if (requests.id === +userId) {
                return true
            }
        }
        return false
    }

    return (
        <ul>
            {requests && requests.map(req => {

                if (req.requests && checkRequests(req.requests)) {
                    return (
                        <li>
                            <SentRequest partyName={req.title} partyId={req.id} userId={userId} />
                        </li>
                    )
                }
            })}

        </ul>
    )
}

export default ProfileSentRequests

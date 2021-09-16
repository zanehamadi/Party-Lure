import ReceivedRequest from "./ReceivedRequest"

const ProfileReceivedRequests = ({ requests, partyId }) => {


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

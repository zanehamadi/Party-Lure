import OneSentFriendRequest from "./OneSentFriendRequest"



const SentFriendRequests = ({requests}) => {
    console.log('these are the requests you sent', requests )
    return (

        <div>
            <h2> Sent Friend Requests </h2>
       {requests &&
        requests.map(request => {

            return <OneSentFriendRequest request = {request} />
        })
    }
    </div>
    )
}

export default SentFriendRequests

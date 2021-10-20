import OneSentFriendRequest from "./OneSentFriendRequest"



const SentFriendRequests = ({requests}) => {
    console.log('these are the requests you sent', requests )
    return (

        <div className = 'your-parties'>
            <h2> Sent Friend Requests </h2>
       {requests.length > 0 &&
        requests.map(request => {

            return <OneSentFriendRequest request = {request} />
        })
    }
    {requests.length <= 0 &&
        <h3>
            No sent requests
        </h3>
    }
    </div>
    )
}

export default SentFriendRequests

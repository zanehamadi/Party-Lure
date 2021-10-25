import OneReceivedFriendRequest from "./OneReceivedFriendRequest"


const ReceivedFriendRequests = ({requests}) => {
    console.log('these are the requests you received', requests )

    return (
       <div className = 'your-parties'>
            <h2> Received Friend Requests </h2>
           {requests &&
            requests.map(request => {
                return <OneReceivedFriendRequest request = {request} />
            })
           }
            {requests.length <= 0 &&
                <h3>
                    No received requests
                </h3>
         }
       </div>
    )
}


export default ReceivedFriendRequests

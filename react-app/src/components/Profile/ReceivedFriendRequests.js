import OneReceivedFriendRequest from "./OneReceivedFriendRequest"


const ReceivedFriendRequests = ({requests}) => {
    console.log('these are the requests you received', requests )

    return (
       <div>
            <h2> Received Friend Requests </h2>
           {requests &&
            requests.map(request => {
                return <OneReceivedFriendRequest request = {request} />
            })
           }
       </div>
    )
}


export default ReceivedFriendRequests

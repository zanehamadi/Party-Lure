import OneReceivedFriendRequest from "./OneReceivedFriendRequest"


const ReceivedFriendRequests = ({requests}) => {
    console.log('these are the requests you received', requests )

    return (
       <div>
           {requests &&
            requests.map(request => {
                return <OneReceivedFriendRequest request = {request} />
            })
           }
       </div>
    )
}


export default ReceivedFriendRequests

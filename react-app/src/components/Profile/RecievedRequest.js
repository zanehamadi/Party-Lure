import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { acceptPartyRequest, denyPartyRequest } from "../../store/party_request"

const RecievedRequest = ({partyId, userId ,username}) => {
   const dispatch = useDispatch()

   const acceptRequest = () =>{
       dispatch(acceptPartyRequest(userId,partyId))
       return
   }

   const denyRequest = () => {
       dispatch(denyPartyRequest(userId,partyId))
   }

   return(
       <>
       <span>Request from {username}</span>
       <button onClick= {acceptRequest}>accept</button>
       <button onClick = {denyRequest}>deny</button>
       </>
   )

}

export default RecievedRequest

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { cancelPartyRequest } from "../../store/party_request"


const SentRequest = ({partyId, userId , partyName}) => {
   const dispatch = useDispatch()

    const cancelRequest = () => {
        dispatch(cancelPartyRequest(userId,partyId))
    }

   return(
       <>
       <span>Request to join {partyName}</span>
       <button onClick= {cancelRequest}>cancel</button>

       </>
   )

}

export default SentRequest

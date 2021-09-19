
import { useDispatch } from "react-redux"
import { cancelPartyRequest } from "../../store/party_request"
import ButtonStyle from "../Button/ButtonStyle"


const SentRequest = ({partyId, userId , partyName}) => {
   const dispatch = useDispatch()

    const cancelRequest = () => {
        dispatch(cancelPartyRequest(userId,partyId))
    }

   return(
       <>
       <span>Request to join {partyName}</span>
       <ButtonStyle>
       <button className = 'styled-button' onClick= {cancelRequest}>cancel</button>
       </ButtonStyle>
       </>
   )

}

export default SentRequest


import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { acceptPartyRequest, denyPartyRequest } from "../../store/party_request"
import ButtonStyle from "../Button/ButtonStyle"

const RequestStyle = styled.div`
    display: flex;
    align-items: center;
    background-color: #32373e;
    padding: 4% 10%;
    border-radius: 10px;
    .title{
        font-size: 14px;
    }
    margin:2%;

    .request-buttons{
        display:flex;
        flex-direction: column;
        align-items: center;
    }

`
const ReceivedRequest = ({ partyId, userId, username }) => {
    const dispatch = useDispatch()

    useSelector(state => state.requests.received)

    const acceptRequest = () => {
        dispatch(acceptPartyRequest(userId, partyId))
        return
    }

    const denyRequest = () => {
        dispatch(denyPartyRequest(userId, partyId))
    }

    return (
        <RequestStyle>
            <span>Request from <Link to = {`/users/${userId}`}>{username}</Link></span>
            <div className = 'request-buttons'>
            <ButtonStyle>
            <button className = 'styled-button' onClick={acceptRequest}>
                Accept
            </button>
            </ButtonStyle>
            <ButtonStyle>
            <button className = 'styled-button' onClick={denyRequest}>
                Deny
            </button>
            </ButtonStyle>
            </div>
        </RequestStyle>
    )

}

export default ReceivedRequest

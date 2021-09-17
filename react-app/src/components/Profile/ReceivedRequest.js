import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { acceptPartyRequest, denyPartyRequest } from "../../store/party_request"
import ButtonStyle from "../Button/ButtonStyle"

const ReceivedRequest = ({ partyId, userId, username }) => {
    const dispatch = useDispatch()

    const acceptRequest = () => {
        dispatch(acceptPartyRequest(userId, partyId))
        return
    }

    const denyRequest = () => {
        dispatch(denyPartyRequest(userId, partyId))
    }

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
    return (
        <RequestStyle>
            <span>Request from <Link to = {`/users/userID`}>{username}</Link></span>
            <div className = 'request-buttons'>
            <ButtonStyle>
            <button className = 'styled-button' onClick={acceptRequest}>
                accept
            </button>
            </ButtonStyle>
            <ButtonStyle>
            <button className = 'styled-button' onClick={denyRequest}>
                deny
            </button>
            </ButtonStyle>
            </div>
        </RequestStyle>
    )

}

export default ReceivedRequest

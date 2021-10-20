import { useDispatch } from "react-redux"
import { deleteFriendRequest } from "../../store/friend_requests"
import styled from "styled-components"
import ButtonStyle from "../Button/ButtonStyle"

const RequestStyle = styled.div`

    display:flex;
    flex-direction: row;
    background-color: #32373e;
    padding: 4%;
    border-radius: 10px;
    margin:2%;
    align-items: center;
    span{
        text-align: center;
    }
    .profile-pic{
        margin-right: 1.7%;
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        background-color: white;
        border:none;
    }

    .cancel-friend{
        margin-left: auto;
    }


`

const OneSentFriendRequest = ({request}) => {

    const dispatch = useDispatch()

    const cancelRequest = (id) => {
        dispatch(deleteFriendRequest(id))
    }

    return (
            <RequestStyle>
                <img className = 'profile-pic' src = {request.receiver_pic} alt = {`${request.receiver}`} />
                <span>{request.receiver}</span>
                <div className = 'cancel-friend'>
                <ButtonStyle>
                    <button className = 'styled-button' onClick = {() => cancelRequest(request.id)}>
                        Cancel
                    </button>
                </ButtonStyle>
                </div>
            </RequestStyle>
    )
}


export default OneSentFriendRequest

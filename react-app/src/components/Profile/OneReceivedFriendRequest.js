import { useDispatch } from "react-redux"
import { acceptFriendRequest, deleteFriendRequest } from "../../store/friend_requests"
import styled from "styled-components"
import ButtonStyle from "../Button/ButtonStyle"
import { goGetFriends } from "../../store/friends"

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


const OneReceivedFriendRequest = ({request}) => {
    const dispatch = useDispatch()

    const cancelRequest = (id) => {
        dispatch(deleteFriendRequest(id))
    }
    const acceptRequest = async (id) => {
         await dispatch(acceptFriendRequest(id))

         dispatch(goGetFriends(request.receiver_id))

    }
    return (
        <RequestStyle>
                <img className = 'profile-pic' src = {request.sender_pic} alt = {`${request.receiver}`} />
                <span>{request.sender}</span>
                <div className = 'cancel-friend'>
                <ButtonStyle>
                    <button className = 'styled-button' onClick = { () => acceptRequest(request.id)}>
                        Accept
                    </button>
                </ButtonStyle>
                <ButtonStyle>
                    <button className = 'styled-button' onClick = {() => cancelRequest(request.id)}>
                        Deny
                    </button>
                </ButtonStyle>
                </div>
            </RequestStyle>
    )

}


export default OneReceivedFriendRequest

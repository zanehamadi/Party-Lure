import { useDispatch } from "react-redux"
import { goDeleteFriend } from "../../store/friends"
import styled from "styled-components"

import ButtonStyle from "../Button/ButtonStyle"

const DeleteFriendModalStyle = styled.div`

    display: flex;
    flex-direction: column;
    padding: 2%;
    align-items: center;
    width:200px;
    height: 100px;
    justify-content:center;
    gap: 20px;


`

const DeleteFriend = ({user_id, friend_id, closeModal }) => {
    const dispatch = useDispatch()

    const deleteFriend = (user_id, friend_id) => {

        dispatch(goDeleteFriend(user_id, friend_id))
        closeModal()
    }


    return(
        <DeleteFriendModalStyle>
        <h1>
            Sever Friendship?
        </h1>
        <ButtonStyle>
        <button className = 'styled-button'onClick = {() => { deleteFriend(user_id, friend_id) }}>
            Sever
        </button>
        </ButtonStyle>
        </DeleteFriendModalStyle>

    )
}


export default DeleteFriend

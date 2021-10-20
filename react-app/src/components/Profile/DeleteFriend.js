import { useDispatch } from "react-redux"
import { goDeleteFriend } from "../../store/friends"
import ButtonStyle from "../Button/ButtonStyle"



const DeleteFriend = ({user_id, friend_id, }) => {
    const dispatch = useDispatch()

    const deleteFriend = (user_id, friend_id) => {

        dispatch(goDeleteFriend(user_id, friend_id))
    }


    return(
        <div>
        <h1>
            Sever Friendship?
        </h1>
        <ButtonStyle>
        <button onClick = {() => { deleteFriend(user_id, friend_id) }}>
            Sever
        </button>
        </ButtonStyle>
        </div>
    )
}


export default DeleteFriend

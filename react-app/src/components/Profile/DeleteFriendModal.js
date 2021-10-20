import React, {useState} from "react";

import { Modal } from "../../context/Modal";
import ButtonStyle from "../Button/ButtonStyle";

import DeleteFriend from "./DeleteFriend";


const DeleteFriendModal = ({user_id, friend_id}) => {

    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
            <ButtonStyle>
                <button className = 'styled-button' onClick = {handleClick}>
                    Remove
                </button>
            </ButtonStyle>

            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteFriend user_id = {user_id} friend_id = {friend_id} />
                </Modal>

            }
        </>
    )
}


export default DeleteFriendModal

import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";


export default function LoginFormModal(){
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return(
        <>
        <button onClick={handleClick}>Login</button>
        {showModal &&<Modal onClose={() => setShowModal(false)}>
            <LoginForm />
        </Modal>}
        </>
    )
}

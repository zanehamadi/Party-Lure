import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePostForm from "../Nav/CreatePost";


export default function CreatePostFormModal() {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button onClick={handleClick}>➕</button>
            {showModal && <Modal onClose={() => setShowModal(false)}>
                <CreatePostForm />
            </Modal>}
        </>
    )
}

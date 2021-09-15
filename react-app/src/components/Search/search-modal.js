import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Search from "./index";


export default function CreateSearchFormModal({ posts, activities, activityTypes }) {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button onClick={handleClick}>SEARCH :)</button>
            {showModal && <Modal onClose={() => setShowModal(false)}>
                
            </Modal>}
        </>
    )
}

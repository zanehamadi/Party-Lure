import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./editCommentForm";


export default function EditCommentFormModal({ comment, post, hideEdit, hideDelete }) {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button onClick={handleClick} className="editCommentBut">Edit Comment</button>
            {showModal && <Modal onClose={() => setShowModal(false)}>
                <EditCommentForm closeModal={closeModal} comment={comment} post={post} hideEdit={hideEdit} hideDelete={hideDelete} />
            </Modal>}
        </>
    )
}

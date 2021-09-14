import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePostForm from "../Nav/CreatePost";


export default function CreatePostFormModal({ activityTypes, activities, roles, posts }) {
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
                <CreatePostForm activityTypes={activityTypes} roles={roles} posts={posts} activities={activities} />
            </Modal>}
        </>
    )
}

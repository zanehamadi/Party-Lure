import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { createNewPost } from '../../store/posts';

const CreatePostForm = ({ roles }) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [role, setRole] = useState('');
    const [activity, setActivity] = useState('');

    const dispatch = useDispatch();
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const roleList = roles?.find(role => role.id === +id)
    console.log('THIS IS ROLE ------>', roles)

    const createPost = e => {
        e.preventDefault()
        const payload = {
            user_id: sessionUser?.id,
            title: title,
            content: description,
            recruit_level: +level,
            activity_id: +activity,
            recruit_role: +role,

        }
        dispatch(createNewPost(payload))
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    const updateLevel = (e) => {
        setLevel(e.target.value);
    };

    const updateRole = (e) => {
        setRole(e.target.value);
    };

    const updateActivity = (e) => {
        setActivity(e.target.value);
    };

    return (
        <form onSubmit={createPost}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor='title'>Title: </label>
                <input
                    name='title'
                    type='text'
                    placeholder='Set Title Name'
                    value={title}
                    onChange={updateTitle}
                />
            </div>
            <div>
                <label htmlFor='description'>Description: </label>
                <textarea
                    name='description'
                    type='textarea'
                    placeholder='Description'
                    value={description}
                    onChange={updateDescription}
                />
                <div>
                    <label htmlFor='activity'>Activity: </label>
                    <select
                        name='activity'
                        type='text'
                        placeholder='Select Activity'
                        value={activity}
                        onChange={updateActivity}
                    />
                </div>
                <div>
                    <label htmlFor='level'>Level: </label>
                    <select
                        name='level'
                        type='dropdown'
                        placeholder='Set Required Level'
                        value={level}
                        onChange={updateLevel}
                    />
                </div>
                <div>
                    <label htmlFor='title'>Role: </label>
                    <input
                        name='role'
                        type='checkbox'
                        placeholder="Set Required Roles"
                        value={role}
                        onChange={updateRole}
                    />
                </div>
                <button type='submit'>Create</button>
            </div>
        </form>
    );
};

export default CreatePostForm;

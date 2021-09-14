import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewPost } from '../../store/posts';

const CreatePostForm = () => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [role, setRole] = useState('');
    const [activity, setActivity] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onCreate = async (e) => {
        e.preventDefault();
        const data = await dispatch(createNewPost(title, description, level, role, activity));
        if (data) {
            setErrors(data);
        }
    };

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
        <form onSubmit={onCreate}>
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

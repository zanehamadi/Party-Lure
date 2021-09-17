import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { createNewPost } from '../../store/posts';

const EditPostForm = () => {

    const aTypeSlice = useSelector(state => state.activityTypes)
    const activitySlice = useSelector(state => state.activities)
    const rolesSlice = useSelector(state => state.roles)
    const postsSlice = useSelector(state => state.posts)

    const activityTypes = Object.values(aTypeSlice)
    const activities = Object.values(activitySlice)
    const roles = Object.values(rolesSlice)
    const posts = Object.values(postsSlice)


    const { id } = useParams();
    const post = posts?.find(post => post.id === +id)

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(1);
    const [role, setRole] = useState({ 'Role1': null, 'Role2': null, 'Role3': null, 'Role4': null });
    const [selectRole, setSelectRole] = useState('');
    const [activityType, setActivityType] = useState('');
    const [activity, setActivity] = useState('');

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const editPost = async e => {
        e.preventDefault()
        const payload = {
            postId:post.id,
            userId: sessionUser.id,
            title: title,
            content: description,
            recruitLevel: +level,
            activityId: +activity,
            recruitRole: Object.values(role),
        }
        await dispatch(createNewPost(payload))
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

    const setActive = (e) => {
        let currentlyActive = document.querySelectorAll('.activeRole')
        currentlyActive.forEach(el => el.classList.remove('activeRole'))
        e.target.classList.add('activeRole')
    };

    const changeActive = (e) => {
        let active = document.querySelector('.activeRole')
        active.innerHTML = e.target.dataset.name
        let roleCopy = { ...role }
        roleCopy[active.id] = e.target.value
        setRole({ ...roleCopy })
        setSelectRole(false)
    };

    const updateActivityType = (e) => {
        setActivityType(e.target.value);
    };

    const updateActivity = (e) => {
        setActivity(e.target.value);
    };

    return (
        <form onSubmit={editPost}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor='title'>Title: </label>
                <input name='title' type='text' placeholder='Set Title Name' value={title} onChange={updateTitle} />
            </div>
            <div>
                <label htmlFor='description'>Description: </label>
                <textarea name='description' type='textarea' placeholder='Description' value={description} onChange={updateDescription} />
                <div>
                    <label htmlFor='activityType'>Activity Type: </label>
                    <select name='activityType' type='text' placeholder='Select Activity Type' value={activityType} onChange={updateActivityType}>
                        {activityTypes.map(activityType => {
                            return (
                                <option value={activityType.name} key={activityType.id}>
                                    {activityType.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                {activityType &&
                    < div >
                        <label htmlFor='activities'>Activities: </label>
                        <select name='activities' type='text' placeholder='Select Activity' value={activity} onChange={updateActivity}>
                            {activities.map(activity => {

                                if (activity.type === activityType) {
                                    return (
                                        <option value={activity.id} key={activity.id}>
                                            {activity.name}
                                        </option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                }
                <div>
                    <label htmlFor='level'>Level: </label>
                    <input name='level' type='number' placeholder='Set Required Level' value={level} onChange={updateLevel} min='1' max='50' />
                </div>
                <div>
                    <label htmlFor='title'>Role: </label>
                    <div>
                        <span onClick={(e) => { setActive(e); setSelectRole(true) }} id='Role1'>Role1</span> <span onClick={(e) => { setActive(e); setSelectRole(true) }} id='Role2'>Role2</span> <span onClick={(e) => { setActive(e); setSelectRole(true) }} id='Role3'>Role3</span> <span onClick={(e) => { setActive(e); setSelectRole(true) }} id='Role4'>Role4</span>
                    </div>
                    {selectRole &&
                        <>
                            {
                                roles.map(role => {
                                    return (
                                        <>
                                            <ul>
                                                <input type='radio' value={role.id} key={role.id} name='roles' data-name={role.name} onClick={changeActive} />
                                                <label htmlFor={role.name}>{role.name}</label>
                                            </ul>
                                        </>
                                    )
                                })
                            }
                        </>
                    }
                </div>
                <button type='submit'>Subit Edit</button>
            </div>
        </form >
    );
};

export default EditPostForm;

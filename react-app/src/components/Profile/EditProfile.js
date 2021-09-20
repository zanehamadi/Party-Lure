import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_updateUser } from '../../store/session';
import styled from 'styled-components';

const SubmitStyle = styled.div`
.styled-button{ width: 430px;
top: -20px;
left: 35px;
font-size: 14px;
border-radius: 5px;
font-weight: bold;
color: rgb(191, 191, 191);
padding: .3em .7em;
outline: none;
border: none;
background-color: #7bc2b196;}
`
const EditProfileForm = ({ jobs, closeEditModal }) => {

    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();
    const history = useHistory();

    const [level, setLevel] = useState(+user.level);
    const [job, setJob] = useState(+user.job_id);
    const [image, setImage] = useState('')

    const updateLevel = (e) => setLevel(+e.target.value);

    const updateJob = (e) => setJob(e.target.value);

    const updateImage = (e) => {
        let file = e.target.files[0]
        setImage(file)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            userId: +user.id,
            level: +level,
            jobId: +job,
            image: image
        };
        await dispatch(thunk_updateUser(payload));
        closeEditModal()
        history.push(`/users/${payload?.userId}`)
    };

    return (
        <section className="editContainer">
            <div>

                <form className='create-post-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='profile-pic'>Profile Picture</label>
                        <input
                            type='file'
                            name='profile-pic'
                            id='profile-pic'
                            // value = {image}
                            onChange={updateImage}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='level'>Level: </label>
                        <input name='level' className='form-control' type='number' placeholder='Set Required Level' value={level} onChange={updateLevel} min='1' max='50' />
                    </div>
                    <div className='form-group'>
                        <label>Job</label>
                        <select
                            name='jobId'
                            id='jobs'
                            onChange={updateJob}
                        >
                            <option
                                value={job}
                                disabled
                                selected
                            >
                                What's your job?
                            </option>
                            {jobs && jobs.map(job => {
                                return (
                                    <option key={job.id} value={job.id}>
                                        {job.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <SubmitStyle>
                        <button className="formRequestButtons" type="submit">
                            Submit Edit
                        </button>
                    </SubmitStyle>
                </form>
            </div>
        </section>
    );
};

export default EditProfileForm;

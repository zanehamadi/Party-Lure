import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { thunk_updateUser } from '../../store/session';

const EditProfileForm = ({ jobs, closeEditModal }) => {

    const user = useSelector(state => state.session.user)
    const userId = user?.id

    const dispatch = useDispatch();
    const history = useHistory();

    const [level, setLevel] = useState(+user.level);
    const [job, setJob] = useState(+user.job_id);
    const [image, setImage] = useState('')

    const updateLevel = (e) => setLevel(+e.target.value);
    console.log('JOB', user.job_id)
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
                {console.log(level)}
                {console.log(+level)}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='profile-pic'>Profile Picture</label>
                        <input
                            type='file'
                            name='profile-pic'
                            id='profile-pic'
                            // value = {image}
                            onChange={updateImage}
                        />
                    </div>
                    <div>
                        <label htmlFor='level'>Level: </label>
                        <input name='level' type='number' placeholder='Set Required Level' value={level} onChange={updateLevel} min='1' max='50' />
                    </div>
                    <div>
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
                    <button type="submit">Submit Edit</button>
                </form>
            </div>
        </section>
    );
};

export default EditProfileForm;

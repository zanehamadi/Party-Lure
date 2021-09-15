import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { getAllJobs } from '../../store/job';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState('')
  const [jobId, setJobId] = useState(0)
  const [level, setLevel] = useState(1)
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getAllJobs())

  }, [dispatch])

  let jobState = useSelector(state => state.jobs)
  let jobs = Object.values(jobState)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, jobId, level, image));
      if (data) {
        setErrors(data)
      }
    }
  };
  const updateProfilePic = (e) => {
    let file = e.target.files[0]
    setImage(file)
  }
  const updateJob = (e) => {
    setJobId(e.target.value)
  }
  const updateLevel = (e) => {
    setLevel(e.target.value)
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='profile-pic'>Profile Picture</label>
        <input
          type='file'
          name='profile-pic'
          id='profile-pic'
          // value = {image}
          onChange={updateProfilePic}
        />
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Job</label>
        <select
          name='jobId'
          id='jobs'
          onChange={updateJob}
        >
          <option
            value=''
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
      <div>
        <label>Level</label>
        <input
          type='number'
          name='level'
          min='1'
          max='50'
          value={level}
          onChange={updateLevel}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;

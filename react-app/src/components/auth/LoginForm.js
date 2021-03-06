import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import styled from 'styled-components';

const LoginStyle = styled.div`
    width: 500px;
    height: 500px;
`
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <LoginStyle>
      <div className="form-container">
        <form className="form" onSubmit={onLogin}>
          <div className="val-container">
            {errors.map((error, ind) => (
              <div className="val-error" key={ind}>{error}</div>
            ))}
          </div>
          <div className="div-container">
            <label className="form-label" htmlFor='email'>Credential: </label>
            <input
              name='email'
              type='text'
              placeholder='Enter username or email'
              value={email}
              onChange={updateEmail}
              className="form-input"
            />
          </div>
          <div className="div-container">
            <label className="form-label" htmlFor='password'>Password: </label>
            <input
              name='password'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={updatePassword}
              className="form-input"
            />
          </div>
          <button className="signupButton" id="login-btn" type='submit'>Login</button>
        </form>
      </div>
    </LoginStyle>
  );
};

export default LoginForm;

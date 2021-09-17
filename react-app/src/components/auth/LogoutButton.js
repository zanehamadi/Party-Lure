import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router';
import ButtonStyle from '../Button/ButtonStyle';





const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
  <ButtonStyle>
      <button className = 'styled-button' onClick={onLogout}>
          Logout
          </button>
  </ButtonStyle>);
};

export default LogoutButton;


import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
// import LoginFormModal from './auth/LoginFormModal';
const NavBar = ({ sessionUser, authenticated }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/posts' exact={true} activeClassName='active'>
            Posts
          </NavLink>
        </li>
        {!authenticated ?
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </>
          :
          <>
            <li>
              <NavLink to='/post' exact={true} activeClassName='active'>
                ➕
              </NavLink>
            </li>
            <li>
              <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
                👤
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

export default NavBar;

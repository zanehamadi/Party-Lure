import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import CreatePostFormModal from './CreatePostModal';
import Search from '../Search';
// import LoginFormModal from './auth/LoginFormModal';
const NavBar = ({ sessionUser, authenticated }) => {

  // const rolesSlice = useSelector(state => state.roles)
  // const usersSlice = useSelector(state => state.users)
  // const partiesSlice = useSelector(state => state.parties)

  // const roles = Object.values(rolesSlice)
  // console.log('THIS IS ROLES ------>', roles)
  // const users = Object.values(usersSlice)
  // const parties = Object.values(partiesSlice)

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
        <li>
          <Search />
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
              <CreatePostFormModal />
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

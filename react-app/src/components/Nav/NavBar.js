import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import CreatePostFormModal from './CreatePostModal';
import Search from '../Search';
import DemoButton from '../auth/DemoButton';

const NavBar = ({ sessionUser, authenticated }) => {

  const aTypeSlice = useSelector(state => state.activityTypes)
  const activitySlice = useSelector(state => state.activities)
  const rolesSlice = useSelector(state => state.roles)
  const postsSlice = useSelector(state => state.posts)

  const activityTypes = Object.values(aTypeSlice)
  const activities = Object.values(activitySlice)
  const roles = Object.values(rolesSlice)
  const posts = Object.values(postsSlice)


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
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <DemoButton />
            </li>
          </>
          :
          <>
            <li>
              <CreatePostFormModal activityTypes={activityTypes} activities={activities} roles={roles} posts={posts} />
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

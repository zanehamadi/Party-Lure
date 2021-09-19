import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import CreatePostFormModal from './CreatePostModal';
import Search from '../Search/index'
import DemoButton from '../auth/DemoButton';
import ButtonStyle from '../Button/ButtonStyle'
import './NavBar.css'
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

    <div className='nav-container'>
      <nav>
        <ul>
          <li>
            <ButtonStyle>
              <button className="styled-button">
                <NavLink to='/' exact={true} activeClassName='active'>
                  Home
                </NavLink>
              </button>
            </ButtonStyle>
          </li>
          {!authenticated ?
            <>
              <li>
                <ButtonStyle>
                  <button className="styled-button">
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                      Sign Up
                    </NavLink>
                  </button>
                </ButtonStyle>
              </li>
              <li>
                <ButtonStyle>
                  <button className="styled-button">
                    <NavLink to='/login' exact={true} activeClassName='active'>
                      Login
                    </NavLink>
                  </button>
                </ButtonStyle>
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
                  <img className='nav-url' src={sessionUser?.profile_url}></img>
                </NavLink>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          }
          <li>
            <ButtonStyle>
              <button className="styled-button">
                <NavLink to='/posts' exact={true} activeClassName='active'>
                  Posts
                </NavLink>
              </button>
            </ButtonStyle>
          </li>
          <li>
            <NavLink to='/about-us' exact={true} activeClassName='active'>
              About Us
            </NavLink>
          </li>
          <li>
            <Search posts={posts} activities={activities} activityTypes={activityTypes} />
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default NavBar;

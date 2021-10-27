import React from 'react';
import { NavLink, useHistory} from 'react-router-dom';
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


  const history = useHistory()
  const homeFunc = () => {
    history.push('/')
  }

  return (

    <div className='nav-container'>
      <nav>
        <div className='nav-link-container'>

                <img src = 'https://partylureawsbucket.s3.amazonaws.com/Untitled42_20210919153126-removebg-preview.png' alt= 'logo' id="navLogo" onClick={homeFunc}/>

            {!authenticated ?
              <>
                  <ButtonStyle>
                    <button className="navButton">
                      <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        Sign Up
                      </NavLink>
                    </button>
                  </ButtonStyle>
                  <ButtonStyle>
                    <button className="navButton">
                      <NavLink to='/login' exact={true} activeClassName='active'>
                        Login
                      </NavLink>
                    </button>
                  </ButtonStyle>
                  <DemoButton/>
              </>
              :
              <>
                  <CreatePostFormModal activityTypes={activityTypes} activities={activities} roles={roles} posts={posts} />
                  <button className='navButton'>
                    <NavLink to={`/users/${sessionUser.id}`} exact={true}>
                      Profile
                    </NavLink>
                  </button>
                  <LogoutButton />
              </>
            }
              <ButtonStyle>
                <button className="navButton">
                  <NavLink to='/posts' exact={true} activeClassName='active navButton'>
                    View Posts
                  </NavLink>
                </button>
              </ButtonStyle>
              <button className="navButton">
                <NavLink to='/about-us' exact={true} activeClassName='active navButton' id="aboutUsButton">
                  About Us
                </NavLink>
              </button>
              <Search posts={posts} activities={activities} activityTypes={activityTypes}/>
          </div>
      </nav>

    </div>
  );
}

export default NavBar;

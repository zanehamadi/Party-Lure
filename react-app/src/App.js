import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LoginFormModal from './components/auth/LoginFormModal';
import Posts from './components/Posts'
import Users from './components/Users'
import {getPosts} from './store/posts'
import {getUsers} from './store/users'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    dispatch(getPosts())
    dispatch(getUsers())
  }, [dispatch]);


  const postsSlice = useSelector(state => state.posts)
  const usersSlice = useSelector(state => state.users)

  const posts = Object.values(postsSlice)
  const users = Object.values(usersSlice)

  if (!loaded) {
    return null;
  }




  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/test' exact={true}>
          <Users users={users}/>
        </Route>
        <Route path='/posts' exact={true}>
          <Posts posts={posts} />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>
      </Switch>
      <LoginFormModal></LoginFormModal>
    </BrowserRouter>
  );
}

export default App;

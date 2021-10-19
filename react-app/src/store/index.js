import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import session from './session'
import jobs from './job'

import postReducer from './posts'
import userReducer from './users'
import partyReducer from './parties';
import rolesReducer from './roles';
import commentsReducer from './comments';
import activitiesReducer from './activities';
import activityTypesReducer from './activity_types.js';
import requestReducer from './party_request';
import userPartyReducer from './user-parties';
import friendReducer from './friends';
import friendRequestReducer from './friend_requests';

const rootReducer = combineReducers({
  session,
  jobs,
  posts: postReducer,
  users: userReducer,
  parties: partyReducer,
  roles: rolesReducer,
  comments: commentsReducer,
  activities: activitiesReducer,
  activityTypes: activityTypesReducer,
  requests: requestReducer,
  userParties: userPartyReducer,
  friends: friendReducer,
  friendRequests: friendRequestReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

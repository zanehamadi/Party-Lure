import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import './index.css';
import App from './App';
import configureStore from './store';
import * as sessionActions from './store/session'
import * as jobActions from './store/job'
import * as postActions from './store/posts'
import * as requestActions from './store/party_request'
import * as userPartyActions from './store/user-parties'
import  * as friendActions from './store/friends'
import * as friendRequestActions from './store/friend_requests'

const store = configureStore();

window.store = store
window.sessionActions = sessionActions
window.jobActions = jobActions
window.postActions = postActions
window.requestActions = requestActions
window.userPartyActions = userPartyActions
window.friendActions = friendActions
window.friendRequestActions = friendRequestActions

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ModalProvider>
        <App />
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

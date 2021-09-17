// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_USER = 'session/GET_USER'
const UPDATE_USER = "users/UPDATE_USER"

const updateUser = (user) => ({
  type: UPDATE_USER,
  user
})

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const getUser = (user) => ({
  type: GET_USER,
  user
})
const initialState = { user: null, profile: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (credential, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credential,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, jobId, level, image) => async (dispatch) => {

  const formData = new FormData()

  formData.append('username', username)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('jobId', jobId)
  formData.append('level', level)
  formData.append('image', image)



  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getOneUser = (userId) => async (dispatch) => {

  const response = await fetch(`/api/users/${userId}`)
  let data;
  if (response.ok) {
    data = await response.json()
    console.log('GOT USER DATA', data)
    dispatch(getUser(data))
  }

  return
}

export const thunk_updateUser = (user) => async (dispatch) => {


  const form = new FormData()

  form.append('level', user.level)
  form.append('jobId', user.jobId)
  form.append('image', user.image)

  const res = await fetch(`/api/users/${user.userId}/edit`, {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: form
  });


  if (res.ok) {
    const updatedUser = await res.json();
    await dispatch(updateUser(updatedUser))
    return
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload, profile: state.profile }
    case REMOVE_USER:
      return { user: null, profile: state.profile }
    case GET_USER:
      return { user: state.user, profile: action.user }
    case UPDATE_USER:
      let copy = { ...state }
      copy.user = action.user
      copy.profile = action.user
      return {
        ...copy
      }

    default:
      return state;
  }
}


const LOAD_USERS = "users/LOAD_USERS"
const UPDATE_USER = "users/UPDATE_USER"


const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
});

const updateUser= (user) => ({
    type: UPDATE_USER,
    user
})


export const getUsers = () => async (dispatch) => {
    const res = await fetch('/api/users/');
    if (res.ok) {
        const users = await res.json();
        dispatch((loadUsers(users)))
    }
};

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
        const updatedUser= await res.json();
        await dispatch(updateUser(updatedUser))
        return
    }
}


const initialState = {}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            return { ...action.users }
        }
        case UPDATE_USER: {
            return {
                ...state,
                [action.user.id]: {
                    ...state[action.user.id],
                    ...action.user
                }
            }
        }
        default:
            return state
    }
}

export default userReducer

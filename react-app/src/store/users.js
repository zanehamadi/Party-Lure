
const LOAD_USERS = "users/LOAD_USERS"


const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
});

export const getUsers = () => async (dispatch) => {
    const res = await fetch('/api/users/');
    if (res.ok) {
        const users = await res.json();
        dispatch((loadUsers(users)))
    }
};

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            return { ...action.users }
        }
        default:
            return state
    }
}

export default userReducer

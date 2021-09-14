const LOAD_ROLES = "posts/LOAD_ROLES"

const loadRoles = (roles) => ({
    type: LOAD_ROLES,
    roles
});

export const getRoles = () => async (dispatch) => {
    const response = await fetch('/api/roles')
    let data

    if (response.ok) {
        data = await response.json()
        console.log('data', data)
        dispatch(loadRoles(data))
        return
    }
    return
}

const initialState = []

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ROLES: {
            return { ...action.roles }
        }
        default:
            return state
    }
}

export default rolesReducer

const LOAD_ROLES = "roles/LOAD_ROLES"

const loadRoles = (roles) => ({
    type: LOAD_ROLES,
    roles
});

export const getRoles = () => async (dispatch) => {
    const response = await fetch('/api/roles/')

    if (response.ok) {
        const roles = await response.json()
        console.log('roles', roles)
        dispatch(loadRoles(roles))
        return
    }
    return
}

const initialState = {}

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

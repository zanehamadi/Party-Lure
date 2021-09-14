const LOAD_ACTIVITY_TYPES = "roles/LOAD_ACTIVITY_TYPES"

const loadActivityTypes = (activityTypes) => ({
    type: LOAD_ACTIVITY_TYPES,
    activityTypes
});

export const getActivityTypes = () => async (dispatch) => {
    const response = await fetch('/api/activity')

    if (response.ok) {
        const activityTypes = await response.json()
        dispatch(loadActivityTypes(activityTypes))
        return
    }
    return
}

const initialState = {}

const activityTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ACTIVITY_TYPES: {
            return { ...action.activityTypes }
        }
        default:
            return state
    }
}

export default activityTypesReducer

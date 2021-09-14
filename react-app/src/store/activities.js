const LOAD_ACTIVITIES = "roles/LOAD_ACTIVITIES"

const loadActivities = (activities) => ({
    type: LOAD_ACTIVITIES,
    activities
});

export const getActivities = () => async (dispatch) => {
    const response = await fetch('/api/activities')

    if (response.ok) {
        const activities = await response.json()
        dispatch(loadActivities(activities))
        return
    }
    return
}

const initialState = {}

const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ACTIVITIES: {
            return { ...action.activities }
        }
        default:
            return state
    }
}

export default activitiesReducer

const LOAD_JOBS = 'jobs/load'

const loadJobs = (jobs) => ({
    type: LOAD_JOBS,
    jobs
})

export const getAllJobs = () => async (dispatch) => {
    const response = await fetch('/api/jobs')
    let data

    if (response.ok) {
        data = await response.json()
        dispatch(loadJobs(data))
        return
    }

    return

}
const intialState = []

export default function reducer(state = intialState, action) {
    switch (action.type) {
        case LOAD_JOBS:
            return { ...action.jobs }
        default:
            return state
    }
}

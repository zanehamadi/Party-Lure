const GET_REQUESTS = 'requests/GET_REQUESTS'

const getRequests = (requests) => ({
    type: GET_REQUESTS,
    requests
})

export const goGetRequests = (userId) => async (dispatch )=>{
    let res = await fetch(`/api/parties/user/${userId}/requests`)
    let data

    if(res.ok){
        data = await res.json()
        dispatch(getRequests(data))
    }
}


const initialState = {}
const requestReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REQUESTS:
            return {...action.requests}
        default:
            return state
    }
}

export default requestReducer

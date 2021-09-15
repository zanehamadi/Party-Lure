const GET_SENT = 'requests/GET_SENT'
const GET_RECIEVED = 'requests/GET_RECIEVED'
const SEND_REQUEST = 'requests/SEND_REQUEST'
const REPLY = 'requests/REPLY'

const getRecieved = (requests) => ({
    type: GET_RECIEVED,
    requests
})
const getSent = (requests) => ({
    type: GET_SENT,
    requests
})

const sendRequest = (request) => ({
    type : SEND_REQUEST,
    request
})

const acceptRequest = (request) => ({
    type: REPLY,
    request
})
const denyRequest = (request) => ({
    type: REPLY,
    request
})

export const getRecievedRequests = (userId) => async (dispatch) => {
    let res = await fetch(`/api/parties/user/${userId}/recieved`)
    let data
    if(res.ok){
        data = await res.json()
        dispatch(getRecieved(data))
    }
}

export const getSentRequests = (userId) => async (dispatch )=>{
    let res = await fetch(`/api/parties/user/${userId}/sent`)
    let data

    if(res.ok){
        data = await res.json()
        dispatch(getSent(data))
    }
}

export const acceptPartyRequest = (userId, partyId) => async (dispatch) => {
    let res = await fetch (`/api/parties/${partyId}/accept`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"userId":userId})
    })


    let data
    if(res.ok){
        dispatch(acceptRequest(data))
    }
}
export const denyPartyRequest = (userId, partyId) => async (dispatch) => {
    let res = await fetch (`/api/parties/${partyId}/deny`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"userId":userId})
    })
    let data
    if(res.ok){
        dispatch(denyRequest(data))
    }
}

export const sendPartyRequest = (userId, partyId) => async (dispatch) => {
    let res = await fetch (`/api/parties/${partyId}/send`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"userId":userId})
    })

    let data

    if(res.ok){
        data = await res.json()
        dispatch(sendRequest(data))
    }

}


const initialState = {sent: {}, recieved:{}}
const requestReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SENT:
            return {...state, sent: {...state.sent, ...action.requests}}
        case GET_RECIEVED:
            return {...state , recieved: {...state.recieved, ...action.requests}}
        case SEND_REQUEST:
            return{...state, sent: {...state.sent, [action.request.id]:action.request}}
        case REPLY:
            if (state.recieved[action.request.id]){
                let newState = {...state}
                newState.recieved[action.request.id] = {...action.request}
                return{...newState}
            }
            return state
        default:
            return state
    }
}

export default requestReducer

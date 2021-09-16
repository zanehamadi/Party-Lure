const GET_SENT = 'requests/GET_SENT'
const GET_RECEIVED = 'requests/GET_RECEIVED'
const SEND_REQUEST = 'requests/SEND_REQUEST'
const REPLY = 'requests/REPLY'
const CANCEL = 'requests/CANCEL'
const getReceived = (requests) => ({
    type: GET_RECEIVED,
    requests
})
const getSent = (requests) => ({
    type: GET_SENT,
    requests
})

const sendRequest = (request) => ({
    type: SEND_REQUEST,
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

const cancelRequest = (request) => ({
    type: CANCEL,
    request
})

export const getReceivedRequests = (userId) => async (dispatch) => {
    console.log('getting requests for', userId)
    let res = await fetch(`/api/parties/user/${userId}/received`)
    let data
    if (res.ok) {
        data = await res.json()
        dispatch(getReceived(data))
    }
}

export const getSentRequests = (userId) => async (dispatch) => {
    let res = await fetch(`/api/parties/user/${userId}/sent`)
    let data

    if (res.ok) {
        data = await res.json()
        dispatch(getSent(data))
    }
}

export const acceptPartyRequest = (userId, partyId) => async (dispatch) => {
    let res = await fetch(`/api/parties/${partyId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userId": userId })
    })


    let data
    if (res.ok) {
        data = await res.json()
        console.log(data)
        dispatch(acceptRequest(data))
    }
}
export const denyPartyRequest = (userId, partyId) => async (dispatch) => {
    let res = await fetch(`/api/parties/${partyId}/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userId": userId })
    })
    let data
    if (res.ok) {
        data = await res.json()
        dispatch(denyRequest(data))
    }
}

export const sendPartyRequest = (userId, partyId) => async (dispatch) => {
    let res = await fetch(`/api/parties/${partyId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userId": userId })
    })

    let data

    if (res.ok) {
        data = await res.json()
        dispatch(sendRequest(data))
    }

}

export const cancelPartyRequest = (userId, partyId) => async (dispatch) => {
    let res = await fetch(`/api/parties/${partyId}/cancel`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userId": userId })
    })
    let data
    if (res.ok) {
        data = await res.json()
        dispatch(cancelRequest(data))
    }

}


const initialState = { sent: {}, received: {} }
const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SENT:
            return { ...state, sent: { ...state.sent, ...action.requests } }
        case GET_RECEIVED:
            return { ...state, received: { ...state.received, ...action.requests } }
        case SEND_REQUEST:
            return { ...state, sent: { ...state.sent, [action.request.id]: action.request } }
        case REPLY:
            let newState = { ...state }
            if (state.received[action.request.id]) {
                newState.received = { ...newState.received, [action.request.id]: action.request }
                return { ...newState }
            }
            return newState
        case CANCEL:
            let cancelState = { ...state }
            if (state.sent[action.request.id]) {
                cancelState.sent = { ...cancelState.sent, [action.request.id]: action.request }
                delete cancelState.sent[action.request.id]
            }
            return cancelState
        default:
            return state
    }
}

export default requestReducer

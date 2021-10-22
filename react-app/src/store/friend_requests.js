const GET_RECEIVED = 'friendRequests/GET_RECEIVED'
const GET_SENT = 'friendRequests/GET_SENT'
const SEND = 'friendRequests/SEND'
const REMOVE = 'friendsRequests/REMOVE'




const getReceived = (requests) => ({
    type: GET_RECEIVED,
    requests
})

const getSent = (requests) => ({
    type: GET_SENT,
    requests
})
const send = (request) => ({
    type: SEND,
    request
})
const remove = (id) =>  ({
    type: REMOVE,
    id
})

export const goGetReceivedFriendRequests = (user_id) => async(dispatch) => {
    let res = await fetch(`/api/requests/user/${user_id}/received`)


    if(res.ok){
        let data  = await res.json()
        dispatch(getReceived(data))
    }

 }

 export const goGetSentFriendRequests = (user_id) => async(dispatch) => {
    let res = await fetch(`/api/requests/user/${user_id}/sent`)


    if(res.ok){
        let data  = await res.json()
        dispatch(getSent(data))
    }
 }

 export const goSendFriendRequest = (sender_id, receiver_id) => async (dispatch) => {
     let res = await fetch('/api/requests/send',{
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
             sender_id,
             receiver_id
         })
     })

     if(res.ok){
         let data = await res.json()

        dispatch(send(data))
     }
 }
 export const acceptFriendRequest = (id) => async (dispatch) => {
     let res = await fetch(`/api/requests/${id}/accept`, {
         method: 'POST'
     })

     if(res.ok){
         let data = await res.json()
         dispatch(remove(data.deleted))
     }
 }

 export const deleteFriendRequest = (id) => async (dispatch) => {
    let res = await fetch(`/api/requests/${id}/delete`, {
        method :'DELETE'
    })

    if(res.ok){
        let data = await res.json()
        dispatch(remove(data.deleted))
    }

 }

const initialState = {sent: {}, received: {}}

const friendRequestReducer = (state = initialState, action) => {

    switch(action.type){
       case GET_RECEIVED:{
            return {...state, received: {...action.requests}}
        }
        case GET_SENT:{
            return{...state, sent:{...action.requests}}
        }
        case SEND: {
            return{ ... state, sent: {...state.sent, [action.request.id]: {...action.request}}}
        }
        case REMOVE: {
            let removeState = {...state, sent: {...state.sent}, received: {...state.received}}

            if(removeState.sent[action.id]){
                let removeSent = {...removeState.sent}

                delete removeSent[action.id]

                removeState.sent = {...removeSent}
            }

            if(removeState.received[action.id]){
                let removeReceived = {...removeState.received}

                delete removeReceived[action.id]

                removeState.received = {...removeReceived}
            }

            return {...removeState}
        }
        default:
            return {...state}
    }
}


export default friendRequestReducer

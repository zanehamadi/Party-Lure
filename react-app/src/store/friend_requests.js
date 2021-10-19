const GET_RECEIVED = 'friendRequests/GET_RECEIVED'
const GET_SENT = 'friendRequests/GET_SENT'




const getReceived = (requests) => ({
    type: GET_RECEIVED,
    requests
})

const getSent = (requests) => ({
    type: GET_SENT,
    requests
})

export const goGetReceived = (user_id) => async(dispatch) => {
    let res = await fetch(`/api/requests/user/${user_id}/received`)


    if(res.ok){
        let data  = await res.json()
        dispatch(getReceived(data))
    }

 }

 export const goGetSent = (user_id) => async(dispatch) => {
    let res = await fetch(`/api/requests/user/${user_id}/sent`)


    if(res.ok){
        let data  = await res.json()
        dispatch(getSent(data))
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
        default:
            return {...state}
    }
}


export default friendRequestReducer

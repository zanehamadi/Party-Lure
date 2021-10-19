const GET_RECEIVED = 'friendRequests/GET_RECEIVED'


const getReceived = (requests) => ({
    type: GET_RECEIVED,
    requests
})

export const goGetReceived = (user_id) => async(dispatch) => {
    let res = await fetch('/api/requests/user/${user_id}/received')


    if(res.ok){
        let data  = await res.json()
        dispatch(getReceived(data))
    }

 }
const initialState = {sent: {}, received: {}}

const friendRequestReducer = (state = initialState, action) => {

    switch(action.type){
       case GET_RECEIVED:{
            return {...state, received: {...action.requests}}
        }
        default:
            return {...state}
    }
}


export default friendRequestReducer

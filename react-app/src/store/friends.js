const GET = 'friends/GET'
const DELETE = 'friends/DELTE'


const getFriends = (friends) => ({
    type: GET,
    friends
})
const deleteFriend = (id) => ({
    type: DELETE,
    id
})


export const goGetFriends = (user_id) => async (dispatch) => {

    let res = await fetch(`/api/friends/user/${user_id}`)

    if(res.ok){
        let data = await res.json()

        dispatch(getFriends(data))
    }
}

export const goDeleteFriend = (user_id, friend_id) => async (dispatch) => {

    let res = await fetch(`/api/friends/user/${user_id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({friend_id})
    })

    if(res.ok){
        let data = await res.json()
        dispatch(deleteFriend(data.deleted))
    }
}

const initialState = {}

const friendReducer = (state = initialState, action) => {

    switch(action.type){
        case GET: {
            return {...action.friends}
        }
        case DELETE: {
            let deleteState = {...state}

            if(deleteState[action.id]){
                delete deleteState[action.id]
            }

            return {...deleteState}
        }
        default:
            return {...state}

    }
}

export default friendReducer

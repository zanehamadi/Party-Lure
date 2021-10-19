const GET = 'friends/GET'

const getFriends = (friends) => ({
    type: GET,
    friends
})



const initialState = {}

const friendReducer = (state = initialState, action) => {

    switch(action.type){
        case GET: {

        }
        default:
            return {...state}

    }
}

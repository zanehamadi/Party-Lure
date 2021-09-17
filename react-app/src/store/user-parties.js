const GET_OWNED = 'user-parties/GET'
const GET_MEMBER = 'user-parties/MEMBER'
const LEAVE_PARTY = 'user-parties/LEAVE'

const getOwned = (parties) => ({
    type: GET_OWNED,
    parties
})
const getMember = (parties) => ({
    type: GET_MEMBER,
    parties
})
const leaveParty = (party) => ({
    type: LEAVE_PARTY,
    party
})

export const goLeaveParty = (userId, partyId) => async (dispatch) => {
    let res = await fetch(`/api/parties/${partyId}/leave`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"userId": userId})
    })

    if(res.ok){
        let data = await res.json()
        dispatch(leaveParty(data))
    }
}
export const getOwnedParties = (userId) => async (dispatch) => {
    let res = await fetch(`/api/parties/user/${userId}`)

    if(res.ok){
        let data = await res.json()

        dispatch(getOwned(data))
    }
}

export const getMemberParties = (userId) => async (dispatch) => {
    let res = await fetch(`/api/parties/user/${userId}/member`)

    if(res.ok){
        let data = await res.json()
        dispatch(getMember(data))
    }
}

const initialState = {ownedparties : {}, memberParties :{}}

const userPartyReducer = (state=initialState,action) => {
    switch(action.type){
        case GET_OWNED:
            return {...state, ownedparties: {...action.parties}, memberParties:{...state.memberParties} }
        case GET_MEMBER:
            return {...state, ownedparties: {...state.memberParties}, memberParties:{...action.parties}}
        case LEAVE_PARTY:
            let stateCopy = {...state}
            let membersCopy = {...stateCopy.memberParties}
            delete membersCopy[action.party.id]
            stateCopy.memberParties = {...membersCopy}

            return {...stateCopy}
        default:
            return state
    }
}

export default userPartyReducer

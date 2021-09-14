
const LOAD_PARTIES = "parties/LOAD_PARTIES"

const loadParties = (parties) => ({
    type: LOAD_PARTIES,
    parties
});

export const getParties = () => async (dispatch) => {
    const res = await fetch('/api/parties')
    if (res.ok) {
        const parties = await res.json();
        dispatch((loadParties(parties)))
    }
};

const initialState = {}

const partyReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_PARTIES: {
            return { ...action.parties }
        }
        default:
            console.log('DEFAULT')
            return state
    }
}


export default partyReducer

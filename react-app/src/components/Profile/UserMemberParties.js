import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMemberParties, goLeaveParty } from "../../store/user-parties"


const UserMemberParties = () =>{
    console.log('gettig user parties')
    const dispatch = useDispatch()
    const userId = useSelector(state => state?.session?.user?.id)
    const [parties,setParties] = useState([])
    let partiesState = useSelector(state => state?.userParties?.memberParties)

    useEffect(()=> {
        if(userId){
            dispatch(getMemberParties(userId))
        }

    }, [userId])

    const handleLeave = (partyId) => {
        dispatch(goLeaveParty(userId,partyId))
    }
    useEffect(() => {
        if(partiesState){
            setParties(Object.values(partiesState))
        }
    }, [partiesState])

    return(
        <>
        <h1>Parties Joined</h1>
        { parties.map(party => {
           return( <div>
                <h3>
                    {party.title}
                </h3>
                <button onClick = {() => {
                    handleLeave(party.id)
                }}>
                    Leave Party
                </button>
            </div>)
        })}
        </>
    )
}


export default UserMemberParties

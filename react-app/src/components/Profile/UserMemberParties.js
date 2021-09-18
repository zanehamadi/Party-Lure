import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { getMemberParties, goLeaveParty } from "../../store/user-parties"
import ButtonStyle from "../Button/ButtonStyle"
import {PartyStyle} from './UserParties'

const UserMemberParties = ({owner}) =>{
  
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

    const MemberPartiesStyle = styled.div`
    h1 {
        font-size: 20px;
    }
    .party-info {
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: #32373e;
            padding: 4%;
            border-radius: 10px;
            margin:2%;
            :hover{
                background-color:#39414c;
                cursor: pointer;
            }
        .title {
            font-size: 14px;
        }
        .leave {
            justify-self: flex-end;
        }
    `

    return(
        <MemberPartiesStyle>
        <h1>Parties Joined</h1>
        { parties.map(party => {
           return( <div className = 'party-info'>
                <h3 className = 'title'>
                    {party.title}
                </h3>
                {owner &&
                <ButtonStyle className = 'leave'>
                <button
                    className = 'styled-button leave'
                    onClick = {() => {
                    handleLeave(party.id)
                }}>
                    Leave
                </button>
                </ButtonStyle>
                }
            </div>)
        })}
        </MemberPartiesStyle>
    )
}


export default UserMemberParties

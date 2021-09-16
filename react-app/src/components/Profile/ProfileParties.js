import { useEffect, useState } from "react"
import styled from "styled-components"
import PartyCounter from "./PartyCounter"
import PartyMembers from "./PartyMembers"

const UserPartyStyle = styled.div`
    display: flex;
    flex-direction:
    .content{
        display:flex;
        gap: 10px;
    }
`
const UserParties = ({parties, owner, username }) => {
    console.log('test')
    const [activePartyMembers, setActivePartyMembers] = useState()

    useEffect(() => {
        if(parties){
            setActivePartyMembers(parties[0]?.users)
        }
    },[parties])


    return(
        <UserPartyStyle>
        <div className = 'left-side'>
        <h2>{!owner ? (username+ `'s`): 'Your'} Parties</h2>
        {parties.map(party =>
            <div className = 'content' onClick = {() => {
                setActivePartyMembers(party.users)
            }} >
                <div>
                    <h3>{party?.title}</h3>
                </div>
                <div>
                    <PartyCounter requests={party.requests} />
                </div>
                </div>
            )}
            </div>
            <div className= 'right-side'>
              {parties && activePartyMembers && <PartyMembers members ={activePartyMembers} />}
            </div>


        </UserPartyStyle>

    )
}

export default UserParties

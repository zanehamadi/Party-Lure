import { useEffect, useState } from "react"
import styled from "styled-components"
import PartyCounter from "./PartyCounter"
import PartyMembers from "./PartyMembers"
import ProfileReceivedRequests from "./ProfileReceivedRequests"

const UserPartyStyle = styled.div`
    display: flex;
    flex-direction:
    .content{
        display:flex;
        gap: 10px;
    }
`
const UserParties = ({ parties, owner, username }) => {
    console.log('test')
    const [activePartyMembers, setActivePartyMembers] = useState()
    const [activePartyId, setActivePartyId] = useState()
    const [activePartyRequests, setActivePartyRequest] = useState()

    const setActiveParty = (party) => {
        setActivePartyMembers(party.users)
        setActivePartyId(party.id)
        setActivePartyRequest(party.requests)
    }

    useEffect(() => {
        if (parties) {
            setActivePartyMembers(parties[0]?.users)
            setActivePartyRequest(parties[0]?.requests)
            setActivePartyId(parties[0]?.id)
        }
    }, [parties])


    return (
        <UserPartyStyle>
            <div className='left-side'>
                <h2>{!owner ? (username + `'s`) : 'Your'} Parties</h2>
                {parties.map(party =>
                    <div className='content' onClick={() => {
                        setActiveParty(party)
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
            <div className='right-side'>
                {parties && activePartyMembers && <PartyMembers members={activePartyMembers} />}
                {parties && activePartyRequests && activePartyId && <ProfileReceivedRequests requests={activePartyRequests} partyId={activePartyId} />

                }
            </div>
        </UserPartyStyle>
    )
}

export default UserParties

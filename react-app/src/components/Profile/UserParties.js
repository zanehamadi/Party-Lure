import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import PartyCounter from "./PartyCounter"
import PartyMembers from "./PartyMembers"
import ProfileReceivedRequests from "./ProfileReceivedRequests"
import ProfileSentRequests from "./ProfileSentRequests"
import UserMemberParties from "./UserMemberParties"

const UserPartyStyle = styled.div`
    display: flex;
    flex-direction:
    .content{
        display:flex;
        gap: 10px;
    }
`
const UserParties = ({ parties, owner, username }) => {
    const [activePartyMembers, setActivePartyMembers] = useState()
    const [activePartyId, setActivePartyId] = useState()
    const [activePartyRequests, setActivePartyRequest] = useState()
    const [activePartyName, setActivePartyName] = useState()
    const [colorBlue, setColorBlue] = useState(true)

    const userId = useSelector(state => state.session.user?.id)
    const sentRequestsState = useSelector(state => state.requests.sent)
    const sentRequests = Object.values(sentRequestsState)

    const setActiveParty = (party) => {
        setActivePartyMembers(party.users)
        setActivePartyId(party.id)
        setActivePartyRequest(party.requests)
        setActivePartyName(party.title)
    }

    useEffect(() => {
        if (parties) {
            setActivePartyMembers(parties[0]?.users)
            setActivePartyRequest(parties[0]?.requests)
            setActivePartyId(parties[0]?.id)
            setActivePartyName(parties[0]?.title)
        }
    }, [parties])

    const handleRequestColor = () => {
        setColorBlue(false)
    }

    return (
        <UserPartyStyle>
            <div className='left-side'>
                <h2>{!owner ? (username + `'s`) : 'Your'} Parties</h2>
                {parties.map(party =>
                    <div className='content' onClick={() => {
                        setActiveParty(party)
                        handleRequestColor()
                    }} >
                        <div>
                            <h3>{party?.title}</h3>
                        </div>
                        <div>
                            <PartyCounter colorBlue={colorBlue} requests={party.requests} />
                        </div>
                    </div>
                )}
                <div>
                    <UserMemberParties />
                </div>
            </div>
            <div className='right-side'>
                {parties && activePartyMembers &&
                    <PartyMembers members={activePartyMembers} />
                }
                {parties && activePartyRequests && activePartyId &&
                    < ProfileReceivedRequests requests={activePartyRequests} partyId={activePartyId} userId={userId} />
                }
                {userId && sentRequests && <ProfileSentRequests requests={sentRequests} userId={userId} />

                }
            </div>
        </UserPartyStyle>
    )
}

export default UserParties

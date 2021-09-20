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
    flex-direction: row;
    justify-content: center;
    .content{
        display:flex;
        gap: 10px;
    }
    .left-side{
        background-color: #24282d;
        margin: 2%;
        min-height: 300px;
        padding:2%;
        border-radius: 10px;
        min-width: 300px;
    }
    .right-side{
        background-color: #24282d;
        margin: 2%;
        padding:2%;
        border-radius: 10px;
        min-width: 300px;
    }
    .left-side h2{
        font-size: 20px;
    }
    .your-parties{
        min-height: 150px;
    }
`

export const PartyStyle = styled.div`
    background-color: #32373e;
    padding: 4%;
    border-radius: 10px;
    .title{
        font-size: 14px;
    }
    margin:2%;
    :hover{
        background-color:#39414c;
        cursor: pointer;
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
                <div className ='your-parties'>
               { parties && <h2>{!owner ? (username + `'s`) : 'Your'} Parties</h2> }
                {parties.map(party =>
                <PartyStyle>
                    <div className='content' onClick={() => {
                        setActiveParty(party)
                        handleRequestColor()
                    }} >
                        <div>
                            <h3 className = 'title'>{party?.title}</h3>
                        </div>
                        <div>
                            {owner && <PartyCounter colorBlue={colorBlue} requests={party.requests} />}
                        </div>
                    </div>
                    </PartyStyle>
                )}
                </div>
                <div>
                    <UserMemberParties owner = {owner} />
                </div>
            </div>
            <div className='right-side'>
                {parties && activePartyMembers &&
                    <PartyMembers members={activePartyMembers} />
                }
                {owner && parties && activePartyRequests && activePartyId &&
                    < ProfileReceivedRequests requests={activePartyRequests} partyId={activePartyId} userId={userId} />
                }
                {owner && userId && sentRequests && <ProfileSentRequests requests={sentRequests} userId={userId} />

                }
            </div>
        </UserPartyStyle>
    )
}

export default UserParties

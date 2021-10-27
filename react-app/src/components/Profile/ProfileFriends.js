import { useEffect, useState } from "react"
import FriendDetail from "./FriendDetail"
import styled from "styled-components"
import FriendRequests from "./FriendRequests"

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
        max-height: 300px;
        overflow-y: scroll;
    }
    .right-side{
        background-color: #24282d;
        margin: 2%;
        padding:2%;
        border-radius: 10px;
        min-width: 300px;
        max-height: 300px;
        overflow-y: scroll;
    }
    .left-side h2{
        font-size: 20px;
    }
    .right-side h2{
        margin-bottom: 10px;
    }
    .your-parties{
        min-height: 150px;
    }
`

const ProfileFriends = ({friends, owner, username, user_id}) => {

    return(
        <UserPartyStyle>
            <div className = 'left-side'>
            { friends && <h2> Friends</h2> }
                {
                friends && friends.map(friend => {
                    return(
                    <FriendDetail friend = {friend} owner = {owner} user_id = {user_id}/>)
                })
                }
            </div>
           {owner &&
                <div className = 'right-side'>
                    <FriendRequests />
               </div>

               }

        </UserPartyStyle>
    )
}

export default ProfileFriends

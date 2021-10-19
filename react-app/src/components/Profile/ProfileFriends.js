import { useEffect, useState } from "react"
import FriendDetail from "./FriendDetail"



const ProfileFriends = ({friends, owner}) => {
    return(
        friends && friends.map(friend => {
            return(
            <FriendDetail friend = {friend} owner = {owner} />)
        })
    )
}

export default ProfileFriends

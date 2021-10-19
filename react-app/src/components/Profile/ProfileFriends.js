import { useEffect, useState } from "react"
import FriendDetail from "./FriendDetail"



const ProfileFriends = ({friends, owner}) => {
    console.log(friends, 'friends here')
    return(
        friends && friends.map(friend => {
            console.log(friend, 'i love my friend')
            return(
            <FriendDetail friend = {friend} owner = {owner} />)
        })
    )
}

export default ProfileFriends

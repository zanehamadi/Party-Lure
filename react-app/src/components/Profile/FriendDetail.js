import { Link } from "react-router-dom"
import styled from "styled-components"
import DeleteFriendModal from "./DeleteFriendModal"

const MemberListStyle = styled.div`
    .profile-pic{
        margin-right: 1.7%;
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        background-color: white;
        border:none;
    }
    .member-content{
        display:flex;
        aligin-items:center;
        gap:10px;
        margin:10px;
    }

`

const FriendDetail = ({friend, owner, user_id}) => {

    console.log('getting a space ready for you', friend)
    return (
        <MemberListStyle>
        <div className = 'member-content'>
        <div className = 'right'>
            <img className = 'profile-pic' src = {friend.profile_url} alt='profile-pic'/>
        </div>
        <div className = 'left'>
        <div className = 'username'>
            <Link to = {`${friend.id}`}>
                {friend.username}
            </Link>

        </div>
        <div className = 'job'>
            <img src={friend?.role_url} width={24} height={24} alt='role-url' />{friend.job}
        </div>
        <div className = 'level'>
            {`Level: ${friend.level}`}
        </div>
        </div>
           {owner && <DeleteFriendModal friend_id = {friend.id} user_id = {user_id} /> }
        </div>
        </MemberListStyle>
    )
}


export default FriendDetail

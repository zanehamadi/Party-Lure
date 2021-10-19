import { Link } from "react-router-dom"


const FriendDetail = ({friend, owner}) => {

    console.log('getting a space ready for you', friend)
    return (
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
        </div>
    )
}


export default FriendDetail

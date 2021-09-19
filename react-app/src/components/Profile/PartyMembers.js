import { Link } from "react-router-dom"
import styled from "styled-components"

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
const PartyMembers = ({members}) => {
    return(
        <MemberListStyle>
        <h4>Members:</h4>
        {members.map(user =>{
            return(
                <div className = 'member-content'>
            <div className = 'right'>
                <img className = 'profile-pic' src = {user.profile_url} alt='profile-pic'/>
            </div>
            <div className = 'left'>
            <div className = 'username'>
                <Link to = {`${user.id}`}>
                    {user.username}
                </Link>

            </div>
            <div className = 'job'>
                <img src={user?.role_url} width={24} height={24} alt='role-url' />{user.job}
            </div>
            <div className = 'level'>
                {`Level: ${user.level}`}
            </div>
            </div>
            </div>)
        }
        )}
        </MemberListStyle>
    )
}

export default PartyMembers

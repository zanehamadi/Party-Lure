import { Link } from "react-router-dom"
import styled from "styled-components"

const PartyMembers = ({members}) => {
    const MemberListStyle = styled.div`
        .profile-pic{
            margin-right: 1.7%;
            width: 50px;
            max-height: 50px;
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
    return(
        <MemberListStyle>
        <h4>Members:</h4>
        {members.map(user =>{
            return(
                <div className = 'member-content'>
            <div className = 'right'>
                <img className = 'profile-pic' src = {user.profile_url}/>
            </div>
            <div className = 'left'>
            <div className = 'username'>
                <Link to = {`users/${user.id}`}>
                    {user.username}
                </Link>

            </div>
            <div className = 'job'>
                <img src={user?.role_url} width={24} height={24} />{user.job}
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

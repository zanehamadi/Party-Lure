
const PartyMembers = ({members}) => {

    return(
        <>
        <h4>Members:</h4>
        {members.map(user =>{
            return(
            <div>{`${user.username}`}<img src={user?.role_url} width={24} height={24} />{`${user.job}, Level: ${user.level}`}</div>)
        }
        )}
        </>
    )
}

export default PartyMembers

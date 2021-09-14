import { useParams } from "react-router";

export default function Profile({users, posts, parties}){
    
    const {id} = useParams()
    const user = users?.find(specUser => +specUser.id === +id)
    const userPosts = posts?.filter(revPosts => +revPosts.user_id === +id)
    const userParties = parties?.filter(revParties => +revParties.owner_id === +id)


    return(
    <>
        {console.log('PARTIES', userParties)}
        <h1>
            {`${user?.username}'s Profile`}
        </h1>
        <div>
            {`Job: ${user?.job}`}
        </div>
        <div>
            {`Level: ${user?.level}`}
        </div>
        <div>
            {`Role: ${user?.role}`}
        </div>

        <h2>Posts</h2>
        {userPosts.map(post => 
            <>
            <div>
                {post.title}
            </div>
            </>
        )}

        <h2>Parties</h2>
        {userParties.map(parties => 
            <>
                <div>
                    {parties?.title}
                </div>
            </>
        )}
    </>
    )
}
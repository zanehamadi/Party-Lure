import { useParams } from 'react-router';
import CreateCommentForm from '../Comments/commentForm';
import EditPostForm from '../Posts/EditPostForm';
import { thunk_fetchPostComments } from '../../store/comments';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelPartyRequest, getSentRequests, sendPartyRequest } from '../../store/party_request';

export default function Post({comments, parties,}) {
    const aTypeSlice = useSelector(state => state.activityTypes)
    const activitySlice = useSelector(state => state.activities)
    const rolesSlice = useSelector(state => state.roles)
    const postsSlice = useSelector(state => state.posts)

    const activityTypes = Object.values(aTypeSlice)
    const activities = Object.values(activitySlice)
    const roles = Object.values(rolesSlice)
    const posts = Object.values(postsSlice)

    const [isMember, setIsMember] = useState(false)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const { id } = useParams();
    
    const post = posts?.find(post => post.id === +id)
    const party = parties.find(party => party.post_id === +id)
    console.log('party', party)
    let userComments = comments?.filter((comment) => comment?.post_id === post?.id)

        
    console.log("USER COMMENT LIST", userComments)

    useEffect(() => {
        if(userId){
            console.log('userId from post, userId')
        dispatch(getSentRequests(userId))
        }
    }, [userId])

    let currentUserRequestsState = useSelector(state => state?.requests?.sent)

    let currentUserRequests = Object.values(currentUserRequestsState)
    // useEffect(() => {
    //     userComments = comments?.filter((comment) => comment?.user_id === post?.id)
    // }, [comments])


    const doesUserHaveRequest = () => {
        if(currentUserRequests.length > 0){
            console.log('this is req array', currentUserRequests)
        for(let sentReq of currentUserRequests){
            console.log('this is sentreq', sentReq)
            if(sentReq.id === party.id){
                return true
            }
        }}
        return false
    }

    useEffect(() => {
        if(currentUserRequests[0] && party){
            setIsMember(doesUserHaveRequest())
        }

    },[currentUserRequests, party])

    const cancelRequest = () => {
        if(userId){
        dispatch(cancelPartyRequest(userId,party.id))
        }
    }


    const requestToJoin = () =>{
        dispatch(sendPartyRequest(userId,party.id))
    }

    return (
        <>
            <div>
                {post?.content}
            </div>
            <div>
                {!isMember && <button onClick={requestToJoin}>Request to Join</button>}
                {isMember && <button onClick = {cancelRequest}>Cancel Request</button>}
                <div><EditPostForm posts={posts} roles={roles} activityTypes={activityTypes} activities={activities}/></div>
                <button>Delete Post</button>
                <div>
                    <CreateCommentForm post={post}/>
                </div>
            </div>
            <div>
                {userComments.map(comment=>
                    <div key={comment?.id}><Link to={`/comments/${comment?.id}`}>{comment.content}</Link></div>
                )}
                
            </div>
        </>
    )
}

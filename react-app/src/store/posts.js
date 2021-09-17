const LOAD_POSTS = "posts/LOAD_POSTS"
const UPDATE_POST = 'users/UPDATE_POST'
const DELETE_POST = 'posts/DELTE_POST'
const USER_POST = 'posts/USER_POST'
const UPDATE_USER = 'post/UPDATE_USER'
const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
});

const userPosts = (post) => ({
    type: USER_POST,
    post
})
const updateUser = (post) => ({
    type: UPDATE_USER,
    post
})
const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

export const getPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts/');
    if (res.ok) {
        const posts = await res.json();
        dispatch((loadPosts(posts)))
    }
};
export const getUserPosts = (userId) => async (dispatch) => {
    const res = await fetch(`/api/posts/user/${userId}`)

    if(res.ok) {
        const posts = await res.json();

        dispatch((userPosts(posts)))
    }
}
export const createNewPost = (data) => async (dispatch) => {
    const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });


    if (res.ok) {

        const updatedPost = await res.json();
        await dispatch(updatePost(updatedPost))

        dispatch(updateUser(updatedPost))
    }
}

export const goDeletePost = (postId) => async (dispatch) => {

    const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        dispatch(deletePost(postId))
    }
}

const initialState = {userPosts : {}}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            return { ...state, ...action.posts }
        }
        case DELETE_POST: {
            let newState = { ...state }

            delete newState[action.postId]

            return { ...newState }
        }
        case UPDATE_POST: {
            if (!action.post) { return { ...state } }

            return {
                ...state,
                [action.post.id]: action.post
            }
        }
        case USER_POST :{

            let userState = {...state}
            userState.userPosts = {...action.post}
            return {...userState}
        }
        case UPDATE_USER: {
            let userUpdateState = {...state}
            userUpdateState.userPosts = {...userUpdateState.userPosts, [action.post.id]: action.post}
            return {...userUpdateState}
        }
        default:
            return state
    }
}

export default postReducer

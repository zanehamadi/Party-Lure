const LOAD_POSTS = "posts/LOAD_POSTS"
const UPDATE_POST = 'users/UPDATE_POST'
const DELETE_POST = 'posts/DELTE_POST'


const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
});

const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

export const getPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts');
    if (res.ok) {
        const posts = await res.json();
        dispatch((loadPosts(posts)))
    }
};

export const createNewPost = (data) => async (dispatch) => {
    const res = await fetch ('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedPost = await res.json();
        dispatch(updatePost(updatedPost))
    }
}

export const goDeletePost = (postId) => async (dispatch) => {

    const res = await  fetch (`/api/posts/${postId}`, {
        method : 'DELETE',
    })

    if (res.ok) {
        dispatch(deletePost(postId))
    }
}

const initialState = {}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            return { ...action.posts }
        }
        case DELETE_POST :{
            let newState = {...state}

            delete newState[action.postId]

            return {...newState}
        }
        case UPDATE_POST :{
            if(!action.post){return {...state}}

            return {
                ...state,
                [action.post.id]: action.post
            }
        }
        default:
            return state
    }
}

export default postReducer

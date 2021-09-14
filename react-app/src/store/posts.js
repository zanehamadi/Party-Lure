
const LOAD_POSTS = "posts/LOAD_POSTS"
const UPDATE_POST = 'users/UPDATE_POST'


const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
});

const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

export const getPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts');
    if (res.ok) {
        const posts = await res.json();
        dispatch((loadPosts(posts)))
    }
};

export const createNewPost = (data) => async (dispatch) => {
    const res = await ('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedPost = await res.json();
        dispatch(updatePost(updatedPost))
    }
}

const initialState = {}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            return { ...action.posts }
        }
        default:
            return state
    }
}

export default postReducer

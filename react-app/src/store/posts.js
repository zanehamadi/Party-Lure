
const LOAD_POSTS = "posts/LOAD_POSTS"


const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
});

export const getPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts');
    if(res.ok){
        const posts = await res.json();
        dispatch((loadPosts(posts)))
    }
};

const initialState = {}

const postReducer = (state = initialState, action ) => {
    switch(action.type){
        case LOAD_POSTS: {
            return {...action.posts}
        }
        default:
            return state
    }
}

export default postReducer
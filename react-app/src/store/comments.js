const LOAD_COMMENTS = "posts/LOAD_COMMENTS"
const UPDATE_COMMENT = 'users/UPDATE_COMMENT'


const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

export const getComments = () => async (dispatch) => {
    const res = await fetch('/api/comments');
    if (res.ok) {
        const comments = await res.json();
        dispatch((loadComments(comments)))
    }
};

export const createNewComment = (data) => async (dispatch) => {
    const res = await ('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedComment = await res.json();
        dispatch(updateComment(updatedComment))
    }
}

const initialState = {}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMMENTS: {
            return { ...action.comments }
        }
        default:
            return state
    }
}

export default commentsReducer

const LOAD_COMMENTS = "posts/LOAD_COMMENTS"
const UPDATE_COMMENT = 'users/UPDATE_COMMENT'
const DELETE_COMMENT = 'users/DELETE_COMMENT'

const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
})



export const getComments = () => async (dispatch) => {
    const res = await fetch('/api/comments/');
    if (res.ok) {
        const comments = await res.json();
        dispatch((loadComments(comments)))
    }
};

export const getComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}/`);
    if (res.ok) {
        const comment = await res.json();
        dispatch((loadComments(comment)))
    }
};

export const thunk_fetchUserComments = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/comments/`)
    const comments = await res.json();
    dispatch(loadComments(comments))
}

export const thunk_fetchPostComments = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments/`)
    const comments = await res.json();
    dispatch(loadComments(comments))
}

export const createNewComment = (data) => async (dispatch) => {
    const res = await fetch('/api/comments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedComment = await res.json();
        dispatch(updateComment(updatedComment))
    }
}

export const thunk_editComment = (payload) => async (dispatch) => {
    const res = await fetch(`/api/comments/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const newComment = await res.json();

    if (res.ok) {
        dispatch(updateComment(newComment));
        return
    }
    return newComment;
};

export const thunk_deleteComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteComment(id))
        return
    }
}

const initialState = {}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMMENTS: {
            return { ...action.comments }
        }
        case UPDATE_COMMENT: {
            if (!state[action.comment.id]) {
                let copy = {
                    ...state,
                    [action.comment.id]: action.comment
                }
                return copy
            }
            return {
                ...state,
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.comment
                }
            }
        }
        case DELETE_COMMENT: {
            let copy = { ...state }
            delete copy[action.id]
            return copy
        }
        default:
            return state
    }
}

export default commentsReducer

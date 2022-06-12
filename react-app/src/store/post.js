import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL_POSTS = "/api/GET_ALL_POSTS";
const ADD_A_POST = "/api/ADD_A_POST";
const EDIT_A_POST = "/api/EDIT_A_POST";
const REMOVE_A_POST = "/api/REMOVE_A_POST";
const CLEAN_POST = "/api/CLEAN_POST";

const loadPosts = (payload) => ({
  type: GET_ALL_POSTS,
  payload,
});

const addPost = (payload) => ({
  type: ADD_A_POST,
  payload,
});

const editPost = (payload) => ({
  type: EDIT_A_POST,
  payload,
});

const removePost = (payload) => ({
  type: REMOVE_A_POST,
  payload,
});

export const cleanPost = () => ({
  type: CLEAN_POST,
});

export const getAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/");

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
};

export const getUsersPosts = (payload) => async (dispatch) => {
  const response = await fetch(`/api/posts/${payload.userId}`);

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
};

export const createAPost = (payload) => async (dispatch) => {
  const response = await fetch(`/api/posts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newPost = await response.json();
    dispatch(addPost(newPost));
  }
};

export const editAPost = (payload) => async (dispatch) => {
  const response = await fetch(`/api/posts/${payload.postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const editedPost = await response.json();
    dispatch(editPost(editedPost));
  }
};

export const deleteAPost = (payload) => async (dispatch) => {
  const response = await fetch(`/api/posts/${payload.postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const oldPost = await response.json();
    dispatch(removePost(oldPost));
  }
};

const CREATE_A_COMMENT = "/api/CREATE_A_COMMENT";
const EDIT_A_COMMENT = "/api/EDIT_A_COMMENT";
const DELETE_A_COMMENT = "/api/DELETE_A_COMMENT";

const addComment = (payload) => ({
  type: CREATE_A_COMMENT,
  payload,
});

const editComment = (payload) => ({
  type: EDIT_A_COMMENT,
  payload,
});

const removeComment = (payload) => ({
  type: DELETE_A_COMMENT,
  payload,
});

export const createAComment = (payload) => async (dispatch) => {
  const response = await fetch(`/api/comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newComment = await response.json();
    dispatch(addComment(newComment));
  }
};

export const editAComment = (payload) => async (dispatch) => {
  const response = await fetch(`/api/comments/${payload.commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const editedComment = await response.json();
    dispatch(editComment(editedComment));
  }
};

export const deleteAComment = (payload) => async (dispatch) => {
  const response = await fetch(`/api/comments/${payload.commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const oldComment = await response.json();
    dispatch(removeComment(oldComment));
  }
};

const initialState = {};

const postReducer = (state = initialState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case GET_ALL_POSTS:
      const posts = action.payload.posts;
      posts.forEach((post) => {
        const comments = {};
        newState[post.id] = post;
        newState[post.id].comments.forEach((comment) => {
          comments[comment.id] = comment;
        });
        newState[post.id].comments = comments;
      });
      return newState;
    case ADD_A_POST:
      const newPost = action.payload;
      newState[newPost.id] = newPost;
      newState[newPost.id].comments = {};
      return newState;
    case EDIT_A_POST:
      const editedPost = action.payload;
      const oldComments = { ...newState[editedPost.id].comments };
      newState[editedPost.id] = editedPost;
      newState[editedPost.id].comments = oldComments;
      return newState;
    case REMOVE_A_POST:
      const oldPost = action.payload;
      delete newState[oldPost.id];
      return newState;
    case CLEAN_POST:
      return initialState;
    case CREATE_A_COMMENT:
      const newComment = action.payload;
      let newCommentsObj = newState[newComment.post_id].comments;
      newCommentsObj[newComment.id] = newComment;
      return newState;
    case EDIT_A_COMMENT:
      const editComment = action.payload;
      let editCommentsObj = newState[editComment.post_id].comments;
      editCommentsObj[editComment.id] = editComment;
      return newState;
    case DELETE_A_COMMENT:
      const oldComment = action.payload;
      let oldCommentsObj = newState[oldComment.post_id].comments;
      delete oldCommentsObj[oldComment.id];
      return newState;
    default:
      return state;
  }
};

export default postReducer;

import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL_POSTS = "/api/GET_ALL_POSTS";
const ADD_A_POST = "/api/ADD_A_POST";
const EDIT_A_POST = "/api/EDIT_A_POST";
const REMOVE_A_POST = "/api/REMOVE_A_POST";

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

export const getAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/");

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

const initialState = {};

const postReducer = (state = initialState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case GET_ALL_POSTS:
      const posts = action.payload.posts;
      posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case ADD_A_POST:
      const newPost = action.payload;
      newState[newPost.id] = newPost;
      return newState;
    case EDIT_A_POST:
      const editedPost = action.payload;
      newState[editedPost.id] = editedPost;
      return newState;
    case REMOVE_A_POST:
      const oldPost = action.payload;
      delete newState[oldPost.id];
      return newState;
    default:
      return state;
  }
};

export default postReducer;

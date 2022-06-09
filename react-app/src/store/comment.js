// import rfdc from "rfdc";
// const clone = rfdc();

// const CREATE_A_COMMENT = "/api/CREATE_A_COMMENT";
// const EDIT_A_COMMENT = "/api/EDIT_A_COMMENT";
// const DELETE_A_COMMENT = "/api/DELETE_A_COMMENT";

// const addComment = (payload) => ({
//   type: CREATE_A_COMMENT,
//   payload,
// });

// const editComment = (payload) => ({
//   type: EDIT_A_COMMENT,
//   payload,
// });

// const removeComment = (payload) => ({
//   type: DELETE_A_COMMENT,
//   payload,
// });

// export const createAComment = (payload) => async (dispatch) => {
//   const response = await fetch(`/api/comments/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (response.ok) {
//     const newComment = await response.json();
//     dispatch(addComment(newComment));
//   }
// };

// export const editAComment = (payload) => async (dispatch) => {
//   const response = await fetch(`/api/posts/${payload.commentId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (response.ok) {
//     const editedComment = await response.json();
//     dispatch(editComment(editedComment));
//   }
// };

// export const deleteAPost = (payload) => async (dispatch) => {
//   const response = await fetch(`/api/posts/${payload.commentId}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     const oldComment = await response.json();
//     dispatch(removeComment(oldComment));
//   }
// };

// const initialState = {};

// const commentReducer = (state = initialState, action) => {
//   const newState = clone(state);
//   switch (action.type) {
//     case CREATE_A_COMMENT:
//       const newComment = action.payload;
//       newState[newComment.id] = newComment;
//       return newState;
//     default:
//       return state;
//   }
// };

// export default commentReducer;

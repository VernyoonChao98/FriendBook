import rfdc from "rfdc";
const clone = rfdc();

const CLEAN_USER_PROFILE = "/api/CLEAN_USER_PROFILE";
const GET_USER_PROFILE = "/api/GET_USER_PROFILE";
const EDIT_USER_PROFILE = "/api/EDIT_USER_PROFILE";

export const cleanUserProfile = () => ({
  type: CLEAN_USER_PROFILE,
});

const loadUserProfile = (payload) => ({
  type: GET_USER_PROFILE,
  payload,
});

const editProfile = (payload) => ({
  type: EDIT_USER_PROFILE,
  payload,
});

export const getUserProfile = (payload) => async (dispatch) => {
  const response = await fetch(`/api/users/${payload.userId}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(loadUserProfile(user));
  }
  return response;
};

export const editUserProfile = (payload) => async (dispatch) => {
  const formData = new FormData();
  formData.append("bio", payload.bio);
  formData.append("image", payload.avatar_url);
  const response = await fetch(`/api/users/profile/${payload.userId}`, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    const editedUser = await response.json();
    dispatch(editProfile(editedUser));
  }
};

export const editBannerImage = (payload) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", payload.banner_url);
  const response = await fetch(`/api/users/banner/${payload.userId}`, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    const editedUser = await response.json();
    dispatch(editProfile(editedUser));
  }
};

const initialState = {};

const userProfileReducer = (state = initialState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case GET_USER_PROFILE:
      const userProfile = action.payload;
      newState[userProfile.id] = userProfile;
      let senderObj = {};
      let requestObj = {};
      let senderArr = newState[userProfile.id].sender;
      let requestArr = newState[userProfile.id].recipient;
      senderArr.forEach((friendRQSent) => {
        senderObj[friendRQSent.id] = friendRQSent;
      });
      requestArr.forEach((receivedRQSent) => {
        requestObj[receivedRQSent.id] = receivedRQSent;
      });
      newState[userProfile.id].sender = senderObj;
      newState[userProfile.id].recipient = requestObj;
      return newState;
    case EDIT_USER_PROFILE:
      const editedUserProfile = action.payload;
      newState[editedUserProfile.id] = editedUserProfile;
      let senderObjEdit = {};
      let requestObjEdit = {};
      let senderArrEdit = newState[editedUserProfile.id].sender;
      let requestArrEdit = newState[editedUserProfile.id].recipient;
      senderArrEdit.forEach((friendRQSent) => {
        senderObjEdit[friendRQSent.id] = friendRQSent;
      });
      requestArrEdit.forEach((receivedRQSent) => {
        requestObjEdit[receivedRQSent.id] = receivedRQSent;
      });
      newState[editedUserProfile.id].sender = senderObjEdit;
      newState[editedUserProfile.id].recipient = requestObjEdit;
      return newState;
    case CLEAN_USER_PROFILE:
      return {};
    default:
      return state;
  }
};

export default userProfileReducer;

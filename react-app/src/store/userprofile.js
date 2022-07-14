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
      let senderPendingFQObj = {};
      let receivedPendingFQObj = {};
      let senderArr = newState[userProfile.id].sender;
      let requestArr = newState[userProfile.id].recipient;
      let sentPendingFQArr = newState[userProfile.id].pendingSentFQ;
      let receivedPendingFQArr = newState[userProfile.id].pendingReceivedFQ;
      senderArr.forEach((friendRQSent) => {
        senderObj[friendRQSent.id] = friendRQSent;
      });
      requestArr.forEach((receivedRQSent) => {
        requestObj[receivedRQSent.id] = receivedRQSent;
      });
      sentPendingFQArr.forEach((sent) => {
        senderPendingFQObj[sent.id] = sent;
      });
      receivedPendingFQArr.forEach((received) => {
        receivedPendingFQObj[received.id] = received;
      });
      newState[userProfile.id].sender = senderObj;
      newState[userProfile.id].recipient = requestObj;
      newState[userProfile.id].pendingSentFQ = senderPendingFQObj;
      newState[userProfile.id].pendingReceivedFQ = receivedPendingFQObj;
      return newState;
    case EDIT_USER_PROFILE:
      const editedUserProfile = action.payload;
      newState[editedUserProfile.id] = editedUserProfile;
      let senderObjEdit = {};
      let requestObjEdit = {};
      let senderPendingFQObjEdit = {};
      let receivedPendingFQObjEdit = {};
      let senderArrEdit = newState[editedUserProfile.id].sender;
      let requestArrEdit = newState[editedUserProfile.id].recipient;
      let sentPendingFQArrEdit = newState[editedUserProfile.id].pendingSentFQ;
      let receivedPendingFQArrEdit =
        newState[editedUserProfile.id].pendingReceivedFQ;
      senderArrEdit.forEach((friendRQSent) => {
        senderObjEdit[friendRQSent.id] = friendRQSent;
      });
      requestArrEdit.forEach((receivedRQSent) => {
        requestObjEdit[receivedRQSent.id] = receivedRQSent;
      });
      sentPendingFQArrEdit.forEach((sent) => {
        senderPendingFQObjEdit[sent.id] = sent;
      });
      receivedPendingFQArrEdit.forEach((received) => {
        receivedPendingFQObjEdit[received.id] = received;
      });
      newState[editedUserProfile.id].sender = senderObjEdit;
      newState[editedUserProfile.id].recipient = requestObjEdit;
      newState[editedUserProfile.id].pendingSentFQ = senderPendingFQObjEdit;
      newState[editedUserProfile.id].pendingReceivedFQ =
        receivedPendingFQObjEdit;
      return newState;
    case CLEAN_USER_PROFILE:
      return {};
    default:
      return state;
  }
};

export default userProfileReducer;

import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL_FRIENDS = "/api/GET_ALL_FRIENDS";
const GET_ALL_PENDING_SENT_FQ = "/api/GET_ALL_PENDING_SENT_FQ";
const GET_ALL_PENDING_RECEIVED_FQ = "/api/GET_ALL_PENDING_RECEIVED_FQ";
const ADD_A_PENDING_FQ = "/api/ADD_A_PENDING_FQ";
const ACCEPT_PENDING_RECEIVED_FQ = "/api/ACCEPT_PENDING_RECEIVED_FQ";
const CANCEL_PENDING_FQ = "/api/CANCEL_PENDING_FQ";
const CLEAN_FRIENDS = "/api/CLEAN_FRIENDS";

const getFriends = (payload) => ({
  type: GET_ALL_FRIENDS,
  payload,
});

const getPendingSentFQ = (payload) => ({
  type: GET_ALL_PENDING_SENT_FQ,
  payload,
});

const getPendingReceivedFQ = (payload) => ({
  type: GET_ALL_PENDING_RECEIVED_FQ,
  payload,
});

const addPendingFQ = (payload) => ({
  type: ADD_A_PENDING_FQ,
  payload,
});

const changeReceivedFQ = (payload) => ({
  type: ACCEPT_PENDING_RECEIVED_FQ,
  payload,
});

const cancelingPendingSentFQ = (payload) => ({
  type: CANCEL_PENDING_FQ,
  payload,
});

export const cleanFriends = () => ({
  type: CLEAN_FRIENDS,
});

export const getAllFriends = (payload) => async (dispatch) => {
  const response = await fetch(`/api/friends/${payload.userId}`);

  if (response.ok) {
    const friends = await response.json();
    dispatch(getFriends(friends));
  }
};

export const getAllPendingSentFQ = (payload) => async (dispatch) => {
  const response = await fetch(`/api/friends/sentFQ/${payload.userId}`);

  if (response.ok) {
    const pendingSentFQs = await response.json();
    dispatch(getPendingSentFQ(pendingSentFQs));
  }
};

export const getAllPendingReceivedFQ = (payload) => async (dispatch) => {
  const response = await fetch(`/api/friends/receivedFQ/${payload.userId}`);

  if (response.ok) {
    const pendingReceivedFQ = await response.json();
    dispatch(getPendingReceivedFQ(pendingReceivedFQ));
  }
};

export const createFriendFQ = (payload) => async (dispatch) => {
  const response = await fetch(`/api/friends/${payload.user_b}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const createdFQ = await response.json();
    if (createdFQ.error) {
      return createdFQ.error;
    }
    dispatch(addPendingFQ(createdFQ));
  }
};

export const acceptReceivedFQ = (payload) => async (dispatch) => {
  const response = await fetch(`/api/friends/${payload.friendId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const acceptedReceivedFQ = await response.json();
    dispatch(changeReceivedFQ(acceptedReceivedFQ));
  }
};

export const cancelPendingFQ = (payload) => async (dispatch) => {
  const response = await fetch(`/api/friends/${payload.friendId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const canceledPendingFQ = await response.json();
    dispatch(cancelingPendingSentFQ(canceledPendingFQ));
  }
};

const initialState = {
  friends: {},
  pendingSentFQ: {},
  pendingReceivedFQ: {},
};

const friendsReducer = (state = initialState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case GET_ALL_FRIENDS:
      const acceptedSentFQArr = action.payload.acceptedSentFQ;
      const acceptedReceivedFQArr = action.payload.acceptedReceivedFQ;
      acceptedSentFQArr.forEach((friend) => {
        newState.friends[friend.id] = friend;
      });
      acceptedReceivedFQArr.forEach((friend) => {
        newState.friends[friend.id] = friend;
      });
      return newState;
    case GET_ALL_PENDING_SENT_FQ:
      const pendingSentFQArr = action.payload.sentFQ;
      pendingSentFQArr.forEach((sentFQ) => {
        newState.pendingSentFQ[sentFQ.id] = sentFQ;
      });
      return newState;
    case GET_ALL_PENDING_RECEIVED_FQ:
      const pendingReceivedFQArr = action.payload.receivedFQ;
      pendingReceivedFQArr.forEach((receivedFQ) => {
        newState.pendingReceivedFQ[receivedFQ.id] = receivedFQ;
      });
      return newState;
    case ADD_A_PENDING_FQ:
      const createdFQ = action.payload;
      newState.pendingSentFQ[createdFQ.id] = createdFQ;
      return newState;
    case ACCEPT_PENDING_RECEIVED_FQ:
      const acceptedReceivedFQ = action.payload;
      newState.friends[acceptedReceivedFQ.id] = acceptedReceivedFQ;
      delete newState.pendingReceivedFQ[acceptedReceivedFQ.id];
      return newState;
    case CANCEL_PENDING_FQ:
      const canceledPendingFQ = action.payload;
      delete newState.friends[canceledPendingFQ.id];
      delete newState.pendingReceivedFQ[canceledPendingFQ.id];
      delete newState.pendingSentFQ[canceledPendingFQ.id];
      return newState;
    case CLEAN_FRIENDS:
      return initialState;
    default:
      return state;
  }
};

export default friendsReducer;

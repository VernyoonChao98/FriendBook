import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL_FRIENDS = "/api/GET_ALL_FRIENDS";
const GET_ALL_PENDING_SENT_FQ = "/api/GET_ALL_PENDING_SENT_FQ";
const GET_ALL_PENDING_RECEIVED_FQ = "/api/GET_ALL_PENDING_RECEIVED_FQ";

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
    default:
      return state;
  }
};

export default friendsReducer;

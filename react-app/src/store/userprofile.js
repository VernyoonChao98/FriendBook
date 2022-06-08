import rfdc from "rfdc";
const clone = rfdc();

const CLEAN_USER_PROFILE = "/api/CLEAN_USER_PROFILE";
const GET_USER_PROFILE = "/api/GET_USER_PROFILE";

export const cleanUserProfile = () => ({
  type: CLEAN_USER_PROFILE,
});

const loadUserProfile = (payload) => ({
  type: GET_USER_PROFILE,
  payload,
});

export const getUserProfile = (payload) => async (dispatch) => {
  const response = await fetch(`/api/users/${payload.userId}`);
  if (response.ok) {
    const user = await response.json();
    dispatch(loadUserProfile(user));
  }
};

const initialState = {};

const userProfileReducer = (state = initialState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case GET_USER_PROFILE:
      const userProfile = action.payload;
      newState[userProfile.id] = userProfile;
      return newState;
    case CLEAN_USER_PROFILE:
      return {};
    default:
      return state;
  }
};

export default userProfileReducer;

import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL_USERS = "/api/GET_ALL_USERS";
const CLEAN_USERS = "/api/CLEAN_USERS";

const getUsers = (payload) => ({
  type: GET_ALL_USERS,
  payload,
});

export const cleanUsers = () => ({
  type: CLEAN_USERS,
});

export const getAllUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users/`);

  if (response.ok) {
    const users = await response.json();
    dispatch(getUsers(users));
  }
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case GET_ALL_USERS:
      const users = action.payload.users;
      users.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    case CLEAN_USERS:
      return {};
    default:
      return state;
  }
};

export default usersReducer;

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

export const getAllUsers = (searchInput) => async (dispatch) => {
  const response = await fetch(`/api/users/search/${searchInput}`);

  if (response.ok) {
    const users = await response.json();
    dispatch(getUsers(users));
    return users;
  }
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  const newState = clone(state);
  switch (action.type) {
    case GET_ALL_USERS:
      const newObj = {};
      const users = action.payload.users;
      users.forEach((user) => {
        newObj[user.id] = user;
      });
      return newObj;
    case CLEAN_USERS:
      return {};
    default:
      return state;
  }
};

export default usersReducer;

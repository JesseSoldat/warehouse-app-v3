import { GET_ALL_USERS } from "../actions/admin";

const initialState = {
  allUsers: []
};

export default (state = initialState, action) => {
  const { type, allUsers } = action;
  switch (type) {
    case GET_ALL_USERS:
      console.log("GET_ALL_USERS", action);
      return { ...state, allUsers };

    default:
      return { ...state };
  }
};

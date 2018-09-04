import { GET_ALL_USERS, USER_CHANGE_ROLE } from "../actions/admin";

const initialState = {
  allUsers: []
};

export default (state = initialState, action) => {
  const { type, allUsers, user } = action;
  switch (type) {
    case GET_ALL_USERS:
      return { ...state, allUsers };

    case USER_CHANGE_ROLE:
      const updateAllUsers = [...state.allUsers];
      const userIndex = updateAllUsers.findIndex(
        userObj => userObj._id === user._id
      );
      updateAllUsers.splice(userIndex, 1, user);

      return { ...state, allUsers: updateAllUsers };

    default:
      return { ...state };
  }
};

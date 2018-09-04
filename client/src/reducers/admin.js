import { GET_ALL_USERS, USER_CHANGE_ROLE, USER_DELETE } from "../actions/admin";

const initialState = {
  allUsers: []
};

export default (state = initialState, action) => {
  const { type, allUsers, user, userId } = action;
  let updateAllUsers, userIndex;
  switch (type) {
    case GET_ALL_USERS:
      return { ...state, allUsers };

    case USER_CHANGE_ROLE:
      updateAllUsers = [...state.allUsers];
      userIndex = updateAllUsers.findIndex(userObj => userObj._id === user._id);
      updateAllUsers.splice(userIndex, 1, user);

      return { ...state, allUsers: updateAllUsers };

    case USER_DELETE:
      updateAllUsers = [...state.allUsers];
      userIndex = updateAllUsers.findIndex(userObj => userObj._id === userId);
      updateAllUsers.splice(userIndex, 1);
      console.log(updateAllUsers);

      return { ...state, allUsers: updateAllUsers };

    default:
      return { ...state };
  }
};

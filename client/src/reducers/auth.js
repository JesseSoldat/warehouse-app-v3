const { AUTH_LOGIN, AUTH_LOGOUT } = require("../actions/auth");

const initialState = {
  _id: null,
  token: null
};

export default (state = initialState, action) => {
  const { type, _id, token } = action;

  switch (type) {
    case AUTH_LOGIN:
      // console.log("AUTH_LOGIN reducer", _id);
      return { ...state, _id, token };

    case AUTH_LOGOUT:
      return { ...state, _id, token };

    default:
      return { ...state };
  }
};

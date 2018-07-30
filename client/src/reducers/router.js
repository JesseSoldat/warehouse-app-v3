import { ROUTE_CHANGED } from "../actions/router";

const initialState = { from: null };

export default (state = initialState, action) => {
  const { type, from } = action;
  switch (type) {
    case ROUTE_CHANGED:
      // console.log("ROUTE_CHANGED from:", from);
      return { ...state, from };

    default:
      return { ...state };
  }
};

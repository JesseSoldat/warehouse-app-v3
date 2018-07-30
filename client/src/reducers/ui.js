const { NEW_MSG, NEW_OPTIONS, LOADING } = require("../actions/ui");

const initialState = {
  msg: null,
  loading: false,
  options: null
};

export default (state = initialState, action) => {
  const { type, loading, msg, options } = action;

  switch (type) {
    case LOADING:
      return { ...state, loading };
    case NEW_MSG:
      // console.log("NEW_MSG", msg);
      return { ...state, msg, loading };

    case NEW_OPTIONS:
      // console.log("NEW_OPTIONS", options);
      return { ...state, options, loading };

    default:
      return { ...state };
  }
};

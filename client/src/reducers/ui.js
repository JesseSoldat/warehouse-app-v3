const {
  NEW_MSG,
  NEW_OPTIONS,
  LOADING,
  SHOW_OVERLAY
} = require("../actions/ui");

const initialState = {
  msg: null,
  loading: false,
  showOverlay: false,
  options: null
};

export default (state = initialState, action) => {
  const { type, loading, showOverlay, msg, options } = action;

  switch (type) {
    case LOADING:
      return { ...state, loading };

    case NEW_MSG:
      return { ...state, msg, loading };

    case NEW_OPTIONS:
      return { ...state, options, loading };

    case SHOW_OVERLAY:
      return { ...state, showOverlay };

    default:
      return { ...state };
  }
};

const {
  NEW_MSG,
  NEW_OPTIONS,
  LOADING,
  SHOW_OVERLAY,
  CLEAR_UI_AFTER_ASYNC,
  UI_ACTION_TYPES
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
    // -------------- LOADING -----------------
    case LOADING:
    case UI_ACTION_TYPES.editProductLoading:
      return { ...state, loading };

    // ---------------- MSG ---------------------
    case NEW_MSG:
    case UI_ACTION_TYPES.socketDatabaseOffline:
    case UI_ACTION_TYPES.msgComponentAutomaticClearMsg:
    case UI_ACTION_TYPES.loginDestroyMsg:
    case UI_ACTION_TYPES.authActionStartLoginMsg:
    case UI_ACTION_TYPES.authActionStartRegisterMsg:
    case UI_ACTION_TYPES.authActionRequestResetPasswordEmailMsg:
    case UI_ACTION_TYPES.authActionStartResetPasswordWithTokenMsg:
    case UI_ACTION_TYPES.productActionDeleteProductMsg:
      return { ...state, msg, loading, showOverlay };

    // -------------- NEW OPTIONS -----------------
    case NEW_OPTIONS:
      return { ...state, options, loading, showOverlay };

    case CLEAR_UI_AFTER_ASYNC:
      return { ...state, options, loading, showOverlay };

    // -------------- SHOW_OVERLAY ----------------
    case SHOW_OVERLAY:
    case UI_ACTION_TYPES.registerShowOverlay:
    case UI_ACTION_TYPES.loginOverlay:
    case UI_ACTION_TYPES.navBarLogoutShowOverlay:
    case UI_ACTION_TYPES.passwordResetShowOverlay:
    case UI_ACTION_TYPES.passwordResetWithTokenShowOverlay:
    case UI_ACTION_TYPES.productOnDeleteProductOverlay:
      return { ...state, showOverlay };

    default:
      return { ...state };
  }
};

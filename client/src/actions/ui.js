export const NEW_MSG = "NEW_MSG";
export const NEW_OPTIONS = "NEW_OPTIONS";
export const LOADING = "LOADING";
export const SHOW_OVERLAY = "SHOW_OVERLAY";
export const CLEAR_UI_AFTER_ASYNC = "CLEAR_UI_AFTER_ASYNC";

export const UI_ACTION_TYPES = {
  // ------------------- MSG ------------------------
  msg: "[MSG Source Unknown]",
  socketDatabaseOffline: "[MSG Socket Component] Database if offline",
  msgComponentAutomaticClearMsg: "[MSG Message Component] Automatic Clear msg",
  // AUTH
  loginDestroyMsg: "[MSG Login Page] UN-MOUNT and a NULL msg",
  authActionStartRegisterMsg: "[MSG Auth Action] startRegister",
  authActionStartLoginMsg: "[MSG Auth Action] startLogin",
  authActionStartLogoutMsg: "[MSG Auth Action] startLogout",
  // Password Reset
  authActionRequestResetPasswordEmailMsg:
    "[MSG Auth Action] requestResetPasswordEmail",
  authActionStartResetPasswordWithTokenMsg:
    "[MSG Auth Action] startResetPasswordWithToken",
  // Products
  productActionDeleteProductMsg: "[MSG Product Action] deleteProduct",

  // ------------------- OVERLAY ------------------------
  // AUTH
  registerShowOverlay: "[SHOW_OVERLAY Auth Form - Register Page]",
  loginShowOverlay: "[SHOW_OVERLAY Auth Form - Login Page]",
  navBarLogoutShowOverlay: "[SHOW_OVERLAY Navbar] Logout",
  // Password Reset
  passwordResetShowOverlay: "[SHOW_OVERLAY Auth Form] Request Password Reset",
  passwordResetWithTokenShowOverlay:
    "[SHOW_OVERLAY ResetPassForm] Reset Password with token",
  // Products
  productOnDeleteProductOverlay:
    "[SHOW_OVERLAY Product Details Page] Delete a Product",

  // ------------------- LOADING ------------------------
  // Products
  editProductLoading: "[LOADING Edit Product Page]"
};

// ------------------- MSG ------------------------
export const serverMsg = (msg = null, from = null) => {
  console.log("UI actions - serverMsg", from);
  return {
    type: from ? UI_ACTION_TYPES[from] : NEW_MSG,
    msg,
    loading: false,
    showOverlay: false
  };
};

export const sendServerMsg = ({ msg, from }) => dispatch => {
  dispatch(serverMsg(msg, from));
};

export const serverOptions = (options = null, from = null) => {
  console.log("UI actions - serverOptions", from);
  return {
    type: NEW_OPTIONS,
    options,
    loading: false,
    showOverlay: false
  };
};

export const clearUIAfterAsync = from => {
  console.log("UI actions - clearUIAfterAsync", from);
  return {
    type: from ? UI_ACTION_TYPES[from] : CLEAR_UI_AFTER_ASYNC,
    msg: null,
    options: null,
    loading: false,
    showOverlay: false
  };
};

// ------------------- LOADING ------------------------
export const loading = (from = null) => ({
  type: from ? UI_ACTION_TYPES[from] : LOADING,
  loading: true
});

export const startLoading = ({ from }) => dispatch => {
  console.log("startLoading FROM:", from);
  dispatch(loading(from));
};

// ------------------- OVERLAY ------------------------
export const showOverlay = from => ({
  type: from ? UI_ACTION_TYPES[from] : SHOW_OVERLAY,
  showOverlay: true
});

export const hideOverlay = from => ({
  type: from ? UI_ACTION_TYPES[from] : SHOW_OVERLAY,
  showOverlay: false
});

export const startShowOverlay = ({ from }) => dispatch => {
  dispatch(showOverlay(from));
};

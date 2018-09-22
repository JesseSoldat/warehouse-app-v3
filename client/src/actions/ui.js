export const NEW_MSG = "NEW_MSG";
export const NEW_OPTIONS = "NEW_OPTIONS";
export const LOADING = "LOADING";
export const SHOW_OVERLAY = "SHOW_OVERLAY";

export const UI_ACTION_TYPES = {
  // MSG
  msg: "[Source Unknown] MSG",
  loginDestroyMsg: "[Login Page] UN-MOUNT and a NULL MSG",
  authActionStartRegisterMsg: "[Auth Action] startRegister MSG",
  authActionStartLoginMsg: "[Auth Action] startLogin MSG",
  authActionRequestResetPasswordEmailMsg:
    "[Auth Action] requestResetPasswordEmail MSG",

  // OVERLAY
  registerShowOverlay: "[Auth Form - Register Page] ShowOverlay",
  loginShowOverlay: "[Auth Form - Login Page] ShowOverlay",
  passwordResetShowOverlay: "[Auth Form] Request Password Reset ShowOverlay"
};

export const serverMsg = (msg = null, from = null) => {
  console.log("UI actions - serverMsg", from);

  return {
    type: from ? UI_ACTION_TYPES[from] : NEW_MSG,
    msg,
    loading: false,
    showOverlay: false
  };
};

export const serverOptions = (options = null, from = null) => ({
  type: NEW_OPTIONS,
  options,
  loading: false,
  showOverlay: false
});

export const loading = (loading, from = null) => ({
  type: LOADING,
  loading
});

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

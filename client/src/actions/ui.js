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
  loginClearMsg: "[MSG Login Page] Clear msg on willUnmount",
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
  createProductMsg: "[MSG Create Product Page] Send NULL to clear a msg",
  productActionCreateProductMsg: "[MSG Create Product Page] Send msg",
  productActionEditProductMsg: "[MSG Edit Product Page] Send msg",
  // Product Clear Msg
  createProductClearMsg: "[MSG Create Page] Clear msg on willUnmount",
  editProductClearMsg: "[MSG Edit Page] Clear msg on willUnmount",
  productsClearMsg: "[MSG Products Page] Clear msg on willUnmount",
  productDetailsClearMsg: "[MSG Product Details Page] Clear msg on willUnmount",
  // Producers
  producersClearMsg: "[MSG Producers Page] Clear msg on willUnmount",
  producerDetailsClearMsg:
    "[MSG Producer Detail Page] Clear msg on willUnmount",
  createProducerClearMsg: "[MSG Create Producer Page] Clear msg on willUnmount",
  editProducerClearMsg: "[MSG Edit Producer Page] Clear msg on willUnmount",
  // Customers
  customersClearMsg: "[MSG Customers Page] Clear msg on willUnmount",
  customerDetailsClearMsg:
    "[MSG Customer Details Page] Clear msg on willUnmount",
  createCustomerClearMsg: "[MSG Create Customer Page] Clear msg on willUnmount",
  editCustomerClearMsg: "[MSG Edit Customer Page] Clear msg on willUnmount",
  // Admin
  manageUserClearMsg: "[MSG Edit Manage User Page] Clear msg on willUnmount",
  // Storage
  storageClearMsg: "[MSG Storage Page] Clear msg on willUnmount",

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
  createProductOverlay: "[SHOW_OVERLAY Create Product Page] Create a Product",
  editProductOverlay: "[SHOW_OVERLAY Edit Product Page] Edit a Product",

  // ------------------- LOADING ------------------------
  // Products
  editProductLoading: "[LOADING Edit Product Page] Fetch Data",
  createProductLoading: "[LOADING Create Product Page] Fetch Data",
  // Producers
  producersLoading: "[LOADING Producers Page] Fetch Data",
  // Customers
  customersLoading: "[LOADING Customers Page] Fetch Data"
};

// ------------------- MSG ------------------------
export const serverMsg = (msg = null, from = null) => {
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

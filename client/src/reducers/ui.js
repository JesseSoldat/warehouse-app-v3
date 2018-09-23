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
    case UI_ACTION_TYPES.productsLoading:
    case UI_ACTION_TYPES.productDetailsLoading:
    case UI_ACTION_TYPES.editProductLoading:
    case UI_ACTION_TYPES.createProductLoading:
    case UI_ACTION_TYPES.producersLoading:
    case UI_ACTION_TYPES.producerDetailsLoading:
    case UI_ACTION_TYPES.producersEditLoading:
    case UI_ACTION_TYPES.producersCreateLoading:
    case UI_ACTION_TYPES.customersLoading:
    case UI_ACTION_TYPES.customerDetailsLoading:
    case UI_ACTION_TYPES.customerCreateLoading:
    case UI_ACTION_TYPES.customerEditLoading:
    case UI_ACTION_TYPES.manageUserLoading:
    case UI_ACTION_TYPES.boxLoadingBox:
    case UI_ACTION_TYPES.boxLoadingRack:
    case UI_ACTION_TYPES.boxesLoading:
    case UI_ACTION_TYPES.boxEditLoadingBox:
    case UI_ACTION_TYPES.boxEditLoadingRack:
    case UI_ACTION_TYPES.storageEditLoadingStorages:
    case UI_ACTION_TYPES.storagesDetailsLoadingStorages:
    case UI_ACTION_TYPES.storagesLoadingStorages:
    case UI_ACTION_TYPES.storageEditLoadingRack:
    case UI_ACTION_TYPES.linkFromProductLoadingStorageIds:
    case UI_ACTION_TYPES.linkFromProductLoadingProduct:
    case UI_ACTION_TYPES.linkFromBoxLoadingStorageIds:
    case UI_ACTION_TYPES.linkFromBoxLoadingProduct:
      return { ...state, loading };

    // ---------------- MSG ---------------------
    case NEW_MSG:
    case UI_ACTION_TYPES.socketDatabaseOffline:
    case UI_ACTION_TYPES.msgComponentAutomaticClearMsg:
    case UI_ACTION_TYPES.loginClearMsg:
    case UI_ACTION_TYPES.authActionStartLoginMsg:
    case UI_ACTION_TYPES.authActionStartRegisterMsg:
    case UI_ACTION_TYPES.authActionRequestResetPasswordEmailMsg:
    case UI_ACTION_TYPES.authActionStartResetPasswordWithTokenMsg:
    case UI_ACTION_TYPES.productActionDeleteProductMsg:
    case UI_ACTION_TYPES.productActionCreateProductMsg:
    case UI_ACTION_TYPES.createProductMsg:
    case UI_ACTION_TYPES.createProductClearMsg:
    case UI_ACTION_TYPES.productActionEditProductMsg:
    case UI_ACTION_TYPES.editProductClearMsg:
    case UI_ACTION_TYPES.productsClearMsg:
    case UI_ACTION_TYPES.productDetailsClearMsg:
    case UI_ACTION_TYPES.producersClearMsg:
    case UI_ACTION_TYPES.producerDetailsClearMsg:
    case UI_ACTION_TYPES.customersClearMsg:
    case UI_ACTION_TYPES.customerDetailsClearMsg:
    case UI_ACTION_TYPES.createCustomerClearMsg:
    case UI_ACTION_TYPES.editCustomerClearMsg:
    case UI_ACTION_TYPES.createProducerClearMsg:
    case UI_ACTION_TYPES.editProducerClearMsg:
    case UI_ACTION_TYPES.manageUserClearMsg:
    case UI_ACTION_TYPES.storageClearMsg:
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
    case UI_ACTION_TYPES.resendVerificationShowOverlay:
    case UI_ACTION_TYPES.createProductOverlay:
    case UI_ACTION_TYPES.startShowOverlay:
    case UI_ACTION_TYPES.manageUserUpdateShowOverlay:
    case UI_ACTION_TYPES.manageUserDeleteShowOverlay:
    case UI_ACTION_TYPES.linkFromBoxShowOverlayBoxToShelfSpot:
    case UI_ACTION_TYPES.linkFromBoxShowOverlayProductToBox:
    case UI_ACTION_TYPES.linkFromProductShowOverlayManualLink:
    case UI_ACTION_TYPES.linkFromProductShowOverlayScanLink:
    case UI_ACTION_TYPES.linkItemsShowOverlayScanLink:
    case UI_ACTION_TYPES.boxShowOverlayRemove:
      return { ...state, showOverlay };

    default:
      return { ...state };
  }
};

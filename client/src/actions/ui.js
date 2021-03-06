export const NEW_MSG = "NEW_MSG";
export const NEW_OPTIONS = "NEW_OPTIONS";
export const LOADING = "LOADING";
export const SHOW_OVERLAY = "SHOW_OVERLAY";
export const CLEAR_UI_AFTER_ASYNC = "CLEAR_UI_AFTER_ASYNC";

export const UI_ACTION_TYPES = {
  // ------------------- MSG ------------------------
  socketDatabaseOffline: "MSG [Socket Component] Database if offline",
  msgComponentAutomaticClearMsg: "MSG [Message Component] Auto Clear msg",
  // AUTH
  loginClearMsg: "MSG [Login Page] Clear msg",
  authActionStartRegisterMsg: "MSG [Auth Action] startRegister",
  authActionStartLoginMsg: "MSG [Auth Action] startLogin",
  authActionStartLogoutMsg: "MSG [Auth Action] startLogout",
  // Password Reset
  authActionRequestResetPasswordEmailMsg:
    "MSG [Auth Action] requestResetPasswordEmail",
  authActionStartResetPasswordWithTokenMsg:
    "MSG [Auth Action] startResetPasswordWithToken",
  // Products
  productActionDeleteProductMsg: "MSG [Product Action] deleteProduct",
  createProductMsg: "MSG [Create Product Page]  Clear msg",
  editProductMsg: "MSG [Edit Product Page]  Clear msg",
  productActionCreateProductMsg: "MSG [Create Product Page]",
  productActionEditProductMsg: "MSG [Edit Product Page]",
  // Product Clear Msg
  createProductClearMsg: "MSG [Create Page] Clear msg",
  editProductClearMsg: "MSG [Edit Page] Clear msg",
  productsClearMsg: "MSG [Products Page] Clear msg",
  productDetailsClearMsg: "MSG [Product Details Page] Clear msg",
  // Producers
  producersClearMsg: "MSG [Producers Page] Clear msg",
  producerDetailsClearMsg: "MSG [Producer Detail Page] Clear msg",
  createProducerClearMsg: "MSG [Create Producer Page] Clear msg",
  editProducerClearMsg: "MSG [Edit Producer Page] Clear msg",
  // Customers
  customersClearMsg: "MSG [Customers Page] Clear msg",
  customerDetailsClearMsg: "MSG [Customer Details Page] Clear msg",
  createCustomerClearMsg: "MSG [Create Customer Page] Clear msg",
  editCustomerClearMsg: "MSG [Edit Customer Page] Clear msg",
  // Admin
  manageUserClearMsg: "MSG [Edit Manage User Page] Clear msg",
  // Storage
  storageClearMsg: "MSG [Storage Page] Clear msg",

  // ------------------- OVERLAY ------------------------
  // AUTH
  registerShowOverlay: "SHOW_OVERLAY [Register Page]",
  loginShowOverlay: "SHOW_OVERLAY [Login Page]",
  navBarLogoutShowOverlay: "SHOW_OVERLAY [Navbar] Logout",
  // Password Reset
  passwordResetShowOverlay: "SHOW_OVERLAY [Auth Form] Request Password Reset",
  passwordResetWithTokenShowOverlay:
    "SHOW_OVERLAY [ResetPassForm] Reset Password with token",
  // Verification
  resendVerificationShowOverlay:
    "SHOW_OVERLAY [Auth Form] Resend email verification",
  // Products
  productOnDeleteProductOverlay:
    "SHOW_OVERLAY [Product Details Page] Delete a Product",
  createProductOverlay: "SHOW_OVERLAY [Create Product Page] Create a Product",
  editProductOverlay: "SHOW_OVERLAY [Edit Product Page] Edit a Product",
  productDetailsShowOverlayUnlinkFromShelfSpot:
    "SHOW_OVERLAY [Product Details Page] Unlink Product from ShelfSpot",
  productDetailsShowOverlayUnlinkFromBox:
    "SHOW_OVERLAY [Product Details Page] Unlink Product from Box",
  productImagesShowOverlay:
    "SHOW_OVERLAY [ProductImages Page] handle upload start",
  productImagesHideOverlay:
    "HIDE_OVERLAY [ProductImages Page] handle upload error",
  // Customers
  customersShowOverlayDelete:
    "SHOW_OVERLAY [Customer Details Page] Delete a Customer",
  customerCreateOverlay:
    "SHOW_OVERLAY [Customer Create Page] Create a Customer",
  customerEditOverlayUpdate:
    "SHOW_OVERLAY [Customer Details Page] Update a Customer",
  // Producers
  producersShowOverlayDelete:
    "SHOW_OVERLAY [Producer Details Page] Delete a Producer",
  producersCreateOverlay:
    "SHOW_OVERLAY [Producer Create Page] Create a Producer",
  producersEditOverlayUpdate:
    "SHOW_OVERLAY [Producer Details Page] Update a Producer",
  // Admin
  manageUserUpdateShowOverlay:
    "SHOW_OVERLAY [Manage User Page] Change user role",
  manageUserDeleteShowOverlay: "SHOW_OVERLAY [Manage User Page] Delete User",
  // Link
  linkFromBoxShowOverlayBoxToShelfSpot:
    "SHOW_OVERLAY [Link From Box Page] Link Box to ShelfSpot",
  linkFromBoxShowOverlayProductToBox:
    "SHOW_OVERLAY [Link From Box Page] Link Product to Box",
  linkFromProductShowOverlayManualLink:
    "SHOW_OVERLAY [Link From Product Page] Manual Link Product to ?",
  linkFromProductShowOverlayScanLink:
    "SHOW_OVERLAY [Link From Product Page] Scan Link Product to ?",
  linkItemsShowOverlayScanLink:
    "SHOW_OVERLAY [Link Items Page] Scan Link ? to ?",
  // Box
  boxShowOverlayRemove: "SHOW_OVERLAY [Box Page] Remove Box from ShelfSpot",
  boxCreateShowOverlay: "SHOW_OVERLAY [Box Create Page] Create a Box",
  boxEditShowOverlay: "SHOW_OVERLAY [Box Edit Page] Update a Box",
  boxEditShowOverlayDeleteNoLocation:
    "SHOW_OVERLAY [Box Edit Page] Delete a Box with No Location",
  boxEditShowOverlayDeleteLocation:
    "SHOW_OVERLAY [Box Edit Page] Delete a Box with a Location",
  // Storage
  storageCreateShowOverlay: "SHOW_OVERLAY [Create Page] Create Storage",
  storageEditShowOverlayUpdate: "SHOW_OVERLAY [Edit Page] Edit Storage",
  storageEditShowOverlayDeleteStorage:
    "SHOW_OVERLAY [Edit Page] Delete Storage",
  storageEditShowOverlayDeleteRack: "SHOW_OVERLAY [Edit Page] Delete Rack",
  storageEditShowOverlayDeleteShelf: "SHOW_OVERLAY [Edit Page] Delete Shelf",
  storageEditShowOverlayDeleteShelfSpot:
    "SHOW_OVERLAY [Edit Page] Delete ShelfSpot",

  // ------------------- LOADING ------------------------
  // Products
  productsLoading: "LOADING [Products Page]",
  productDetailsLoading: "LOADING [Product Details Page]",
  editProductLoading: "LOADING [Edit Product Page]",
  createProductLoading: "LOADING [Create Product Page]",
  productImagesLoading: "LOADING [ProductImages Page]",
  // Producers
  producersLoading: "LOADING [Producers Page]",
  producerDetailsLoading: "LOADING [Producer Details Page]",
  producersCreateLoading: "LOADING [Producer Create Page]",
  producersEditLoading: "LOADING [Producer Edit Page]",
  // Customers
  customersLoading: "LOADING [Customers Page]",
  customerDetailsLoading: "LOADING [Customer Details Page]",
  customerCreateLoading: "LOADING [Customer Create Page]",
  customerEditLoading: "LOADING [Customer Edit Page]",
  // Admin
  manageUserLoading: "LOADING [Manage User Page]",
  // Box
  boxesLoading: "LOADING [Boxes Page] Fetch Boxes Data",
  boxLoadingBox: "LOADING [Box Page] Fetch Box Data",
  boxLoadingRack: "LOADING [Box Page] Fetch Rack to populate Box Data",
  boxEditLoadingBox: "LOADING [Box Edit Page] Fetch Box Data",
  boxEditLoadingRack: "LOADING [Box Edit Page] Fetch Rack to populate Box Data",
  // Storage
  storageEditLoadingStorages: "LOADING [Storage Edit Page] Fetch all Storages",
  storageEditLoadingRack: "LOADING [Storage Edit Page] Fetch a Single Rack",
  storageDetailsLoadingRack:
    "LOADING [Storage Details Page] Fetch a Single Rack",
  storagesDetailsLoadingStorages:
    "LOADING [Storage Details Page] Fetch all Storages",
  storagesLoadingStorages: "[LOADING Storages Page] Fetch all Storages",
  // Barcode / Link
  linkFromProductLoadingStorageIds:
    "LOADING [Link From Product Page] Fetch all StorageIds",
  linkFromProductLoadingProduct:
    "LOADING [Link From Product Page] Fetch Product",
  linkFromBoxLoadingStorageIds:
    "LOADING [Link From Box Page] Fetch all StorageIds",
  linkFromBoxLoadingProduct: "LOADING [Link From Box Page] Fetch Product"
};

// ------------------- MSG ------------------------
export const serverMsg = (msg = null, from = null) => ({
  type: from ? UI_ACTION_TYPES[from] : NEW_MSG,
  msg,
  loading: false,
  showOverlay: false
});

// ------------------- Options ------------------------
export const serverOptions = (options = null, from = null) => ({
  type: NEW_OPTIONS,
  options,
  loading: false,
  showOverlay: false
});

// ------------------- Clear After Async ------------------------
export const clearUIAfterAsync = from => ({
  type: from ? UI_ACTION_TYPES[from] : CLEAR_UI_AFTER_ASYNC,
  msg: null,
  options: null,
  loading: false,
  showOverlay: false
});

// ------------------- LOADING ------------------------
export const startLoading = ({ from }) => ({
  type: from ? UI_ACTION_TYPES[from] : LOADING,
  loading: true
});

// ------------------- OVERLAY ------------------------
export const showOverlay = ({ from }) => ({
  type: from ? UI_ACTION_TYPES[from] : SHOW_OVERLAY,
  showOverlay: true
});

export const hideOverlay = ({ from }) => ({
  type: from ? UI_ACTION_TYPES[from] : SHOW_OVERLAY,
  showOverlay: false
});

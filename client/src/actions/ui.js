export const NEW_MSG = "NEW_MSG";
export const NEW_OPTIONS = "NEW_OPTIONS";
export const LOADING = "LOADING";

export const serverMsg = (msg = null) => ({
  type: NEW_MSG,
  msg,
  loading: false
});

export const serverOptions = (options = null) => ({
  type: NEW_OPTIONS,
  options,
  loading: false
});

export const loading = loading => ({
  type: LOADING,
  loading
});

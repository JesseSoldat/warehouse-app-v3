import { serverMsg, serverOptions, clearUIAfterAsync } from "../ui";
import buildClientMsg from "./buildClientMsg";

// dispatches either a msg && options || just the options
// loading will be set to false either way
const checkForMsg = (msg, dispatch, options = null, from = null) => {
  if (msg) {
    // Have MSG and OPTIONS
    if (options) {
      return dispatch(serverOptions(options));
    }
    // Have MSG but no OPTIONS
    const msgFrom = from ? from + "Msg" : null;

    return dispatch(serverMsg(buildClientMsg(msg), msgFrom));
  } else {
    // NO MSG and have OPTIONS
    if (options) {
      return dispatch(serverOptions(options));
    }
    // NO MSG or OPTIONS
    return dispatch(clearUIAfterAsync());
  }
};

export default checkForMsg;

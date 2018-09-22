import { serverMsg, serverOptions } from "../ui";
import buildClientMsg from "./buildClientMsg";

// dispatches either a msg && options || just the options
// loading will be set to false either way
const checkForMsg = (msg, dispatch, options = null, from = null) => {
  if (msg) {
    // Have MSG and OPTIONS
    if (options) {
      dispatch(serverOptions(options));
    }
    // Have MSG but no OPTIONS
    const msgFrom = from ? from + "Msg" : null;
    console.log("msgFrom:", msgFrom);

    return dispatch(serverMsg(buildClientMsg(msg), msgFrom));
  }
  // NO MSG
  dispatch(serverOptions(options));
};

export default checkForMsg;

import { serverMsg, serverOptions } from "../ui";
import buildClientMsg from "./buildClientMsg";

// dispatches either a msg && options || just the options
// loading will be set to false either way
const checkForMsg = (msg, dispatch, options = null) => {
  if (msg) {
    if (options) {
      dispatch(serverOptions(options));
    }
    return dispatch(serverMsg(buildClientMsg(msg)));
  }
  dispatch(serverOptions(options));
};

export default checkForMsg;

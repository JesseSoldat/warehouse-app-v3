import { serverMsg, serverOptions } from "../ui";
import { login } from "../auth";
import buildClientMsg from "./buildClientMsg";

const axiosLog = (status, data) => {
  // console.log("--------------- axios error handling -----------------");
  // console.log("axios status:", status);
  // console.log("axios data:", data);
  // console.log("info:", data.msg.info);
  // console.log("color:", data.msg.color);
  // console.log("code:", data.msg.code);
};

const errMsg = (method, target) =>
  `An unknown error occured while trying to ${method} the ${target}.`;

const axiosResponseErrorHandling = (error, dispatch, method, target) => {
  let info, color, code;

  // check for axios response object any response other than 2xx
  if (error && error.response) {
    const { status, data } = error.response;
    // check that the server sent the correct msg obj
    if (data) {
      const { msg, options } = data;
      // --------------------  check for data options --------------------------
      if (options) {
        switch (options) {
          case "tokenError":
            if (msg) {
              info =
                msg.info ||
                "A user with that token was not found. Please login again";
              color = "blue";
            }
            localStorage.removeItem("user");
            dispatch(login(null, null));
            break;

          default:
            console.log(`There is no default case for the ${options} code.`);
            break;
        }
        dispatch(serverOptions(serverOptions(options)));
      }
      // check for msg with an info property
      if (!data.msg || !data.msg.info) {
        console.log(
          "axios error handling - the msg obj was not sent correctly from the server"
        );
        info = errMsg(method, target);
        color = "red";
      }
      // default case we have msg obj with color and info property
      else {
        axiosLog(status, data);
        color = data.msg.color;
        info = data.msg.info;

        if (data.msg.code) {
          code = data.msg.code;
        }
      }
    }
  }
  // The request was made but no response was received
  else if (error.request) {
    info = "The request was made but no response was received from the server.";
    color = "red";
  } else {
    // No axios object catch any other errors
    info = errMsg(method, target);
    color = "red";
  }

  dispatch(
    serverMsg(
      buildClientMsg({
        info,
        color,
        code
      })
    )
  );
};

export default axiosResponseErrorHandling;

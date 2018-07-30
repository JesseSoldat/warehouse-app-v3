const { msgObj, errMsg } = require("./serverRes");

const serverMsg = (key, method, target, options = null) => {
  let msg;
  switch (key) {
    case "error":
      msg = msgObj(errMsg(method, target), "red", options);
      break;

    case "allFields":
      msg = msgObj("All form fields must be filled in.", "red");
      break;

    case "isEmail":
      msg = msgObj(
        "The email address you have entered is not a valid email.",
        "red"
      );
      break;

    case "passwordLength":
      msg = msgObj("The password must be at least 6 characters long.", "red");
      break;

    case "haveUser":
      msg = msgObj("The email address you entered is already in use.", "red");
      break;

    case "noUser":
      msg = msgObj("No user for this email and password.", "red");
      break;

    case "isVerified":
      msg = msgObj(
        "This account has already been verified. Please log in.",
        "blue"
      );
      break;

    default:
      console.log("serverMsg - no key ----------------------");
      msg = msgObj("An unkown error occured.", "red");
      break;
  }

  return msg;
};

module.exports = serverMsg;

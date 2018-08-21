// helpers
import AuthErrMsg from "./authErrMsg";

const passwordIsValid = password => {
  const minLength = 6;
  const errObj = {};

  // password
  if (!password || password.length < minLength) {
    // length under minLength
    if (password && password.length < minLength)
      errObj["passwordErr"] = AuthErrMsg.passwordLength;
    // no password
    if (!password) errObj["passwordErr"] = AuthErrMsg.passwordErr;
  }

  return errObj;
};

export default passwordIsValid;

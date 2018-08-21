// helpers
import AuthErrMsg from "./authErrMsg";

const confirmPasswordIsValid = (password, confirmPassword) => {
  const errObj = {};

  if (password === confirmPassword) {
    if (!confirmPassword) {
      errObj["confirmPasswordErr"] = AuthErrMsg.confirmPasswordErr;
    } else {
      errObj["confirmPasswordErr"] = null;
    }
  } else {
    errObj["confirmPasswordErr"] = AuthErrMsg.confirmPasswordErr;
  }

  return errObj;
};

export default confirmPasswordIsValid;

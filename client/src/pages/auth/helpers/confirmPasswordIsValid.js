// helpers
import AuthErrMsg from "./authErrMsg";

const confirmPasswordIsValid = (password, confirmPassword) => {
  const errObj = {};

  if (password && confirmPassword !== password) {
    errObj["confirmPasswordErr"] = AuthErrMsg.confirmPasswordErr;
  }

  return errObj;
};

export default confirmPasswordIsValid;

// helpers
import AuthErrMsg from "./authErrMsg";
import passwordIsValid from "./passwordIsValid";
import confirmPasswordIsValid from "./confirmPasswordIsValid";
// utils
import isEmail from "../../../utils/validation/isEmail";
import isEmpty from "../../../utils/validation/isEmpty";

const formIsValid = (form, parent) => {
  const { username, email, password, confirmPassword } = form;
  let errObj = {};

  // all flows ----------------------------------------------------
  if (!email || !isEmail(email)) {
    // EMAIL
    if (!email) errObj["emailErr"] = AuthErrMsg.emailErr;
    if (email && !isEmail(email)) errObj["emailErr"] = AuthErrMsg.validEmailErr;
  }
  // login && register flow ----------------------------------------
  if (parent === "login" || parent === "register") {
    // PASSWORD
    if (!password || password.length < 6) {
      const passErrObj = passwordIsValid(password);
      errObj = { ...errObj, ...passErrObj };
    }
  }

  // register flow only -----------------------------------------------
  if (parent === "register") {
    // USERNAME
    if (!username) errObj["usernameErr"] = AuthErrMsg.usernameErr;
    // CONFIRM PASSWORD
    if (password) {
      const confirmPassErrObj = confirmPasswordIsValid(
        password,
        confirmPassword
      );
      errObj = { ...errObj, ...confirmPassErrObj };
    }
  }

  // reset password flow only -----------------------------------------------
  if (parent === "resetPassword") {
    // password
    const passErrObj = passwordIsValid(password);
    errObj = { ...errObj, ...passErrObj };
    // confirm password
    if (password) {
      const confirmPassErrObj = confirmPasswordIsValid(
        password,
        confirmPassword
      );
      errObj = { ...errObj, ...confirmPassErrObj };
    }
  }

  const isValid = isEmpty(errObj);

  return { isValid, errObj };
};

export default formIsValid;

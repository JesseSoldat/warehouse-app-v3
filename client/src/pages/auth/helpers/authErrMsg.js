const generateMsg = (field, type) =>
  `The ${field} field is required to ${type}`;

const registerErrMsg = {
  usernameErr: generateMsg("username", "register"),
  emailErr: generateMsg("email", "register"),
  validEmailErr: "Please enter a valid email",
  passwordErr: generateMsg("password", "register"),
  passwordLength: "Password length must be at least six characters",
  confirmPasswordErr: "Passwords must match to register"
};

const loginErrMsg = {
  emailErr: generateMsg("email", "login"),
  validEmailErr: "Please enter a valid email",
  passwordErr: generateMsg("password", "login"),
  passwordLength: "Password length must be at least six characters"
};

export { registerErrMsg, loginErrMsg };

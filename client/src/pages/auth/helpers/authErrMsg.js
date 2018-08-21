const generateMsg = field => `The ${field} field is required.`;

const AuthErrMsg = {
  usernameErr: generateMsg("username"),
  emailErr: generateMsg("email"),
  validEmailErr: "Please enter a valid email",
  passwordErr: generateMsg("password"),
  passwordLength: "Password length must be at least six characters",
  confirmPasswordErr: "Passwords must match"
};

export default AuthErrMsg;

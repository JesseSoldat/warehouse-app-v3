// models
const User = require("../models/user");
// utils
const { msgObj, serverRes } = require("../utils/serverRes");

// send a token error option to the client
// the client will delete the token from localstorage
// the user will have to login to the app again

const isAuth = async (req, res, next) => {
  const token = req.header("x-auth");

  try {
    if (!token) {
      const msg = msgObj("A token was not sent with the request.", "blue");
      return serverRes(res, 400, msg, null, "tokenError");
    }

    const user = await User.findByToken(token);

    if (!user) {
      const msg = msgObj("A user with this token could not be found.", "blue");
      return serverRes(res, 400, msg, null, "tokenError");
    }

    // give any route using this middleware access to the user and token
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    const msg = msgObj(
      "An error occured while authenticating. Please login again.",
      "blue"
    );
    serverRes(res, 400, msg, null, "tokenError");
  }
};

module.exports = isAuth;

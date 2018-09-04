// models
const User = require("../models/user");
const AuthToken = require("../models/tokens/authToken");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { msgObj, serverRes } = require("../utils/serverRes");
const serverMsg = require("../utils/serverMsg");

module.exports = app => {
  // get all of the users of the app
  app.get("/api/users", isAuth, async (req, res) => {
    try {
      const users = await User.find();
      serverRes(res, 200, null, users);
    } catch (err) {
      const msg = serverMsg("error", "fetch", "users");
      return serverRes(res, 400, msg, null);
    }
  });

  // change the users role
  app.patch("/api/changeUserRole", isAuth, async (req, res) => {
    const { role, email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).send({
          message: "Unable to find a valid user."
        });

      user["role"] = role;

      await user.save();

      serverRes(res, 200, null, user);
    } catch (err) {
      const msg = serverMsg("error", "update", "user role");
      serverRes(res, 400, msg, null);
    }
  });

  // delete a user
  app.patch("/api/deleteUser", async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      const userId = user._id;

      await Promise.all([
        AuthToken.findOneAndRemove({ user: userId }),
        user.remove()
      ]);

      const msg = msgObj(
        `The user with email ${email} was deleted.`,
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, { userId });
    } catch (err) {
      console.log("ERR/deleteUser", err);

      const msg = serverMsg("error", "delete", "user");
      return serverRes(res, 400, msg, null);
    }
  });

  // delete an expired token
  app.post("/api/token", async (req, res) => {
    const { token } = req.body;
    try {
      const user = await User.findByToken(token);

      if (!user) {
        const msg = serverMsg("noUser");
        return serverRes(res, 400, msg, null);
      }

      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== token);
      await user.save();

      const msg = msgObj("The token was deleted.", "blue");
      serverRes(res, 200, msg, null);
    } catch (err) {
      const msg = serverMsg("error", "delete", "token", "token error");
      return serverRes(res, 400, msg, null);
    }
  });
};

// models
const User = require("../models/user");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { msgObj, serverRes } = require("../utils/serverRes");
const serverMsg = require("../utils/serverMsg");

module.exports = app => {
  app.post("/api/changeUserRole", isAuth, async (req, res) => {
    const { role, email } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).send({
          message: "Unable to find a valid user."
        });

      user["role"] = role;

      await user.save();

      serverRes(res, 200, null, null);
    } catch (err) {
      const msg = serverMsg("error", "update", "user role");
      serverRes(res, 400, msg, null);
    }
  });
};

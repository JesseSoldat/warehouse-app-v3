// utils
const { msgObj, serverRes } = require("../utils/serverRes");

const isAdmin = (req, res, next) => {
  const { user } = req;
  const info = "You do not have permission to access this page.";

  if (!user) {
    const msg = msgObj(info, "red");
    return serverRes(res, 400, msg, null);
  }

  if (user.role !== "admin") {
    const msg = msgObj(info, "red");
    return serverRes(res, 400, msg, null);
  }

  next();
};

module.exports = isAdmin;

const { msgObj } = require("../../utils/serverRes");

const checkForStoredItems = box => {
  if (box["storedItems"].length !== 0) {
    return msgObj(
      "Delete or relink all products of this box first.",
      "red",
      "hide-3"
    );
  }
  return null;
};

module.exports = checkForStoredItems;

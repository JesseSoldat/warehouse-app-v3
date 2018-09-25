const { msgObj } = require("../../utils/serverRes");

const storageCheckForStoredItems = storageType => {
  let storageTypeChild;
  switch (storageType) {
    case "storage":
      storageTypeChild = "rack";
      break;

    case "rack":
      storageTypeChild = "shelves";
      break;

    case "shelf":
      storageTypeChild = "shelf spots";
      break;

    case "shelf-spot":
      storageTypeChild = "products or boxes";
      break;

    default:
      break;
  }
  return msgObj(
    `Delete or re-link all ${storageTypeChild} of this ${storageType} first.`,
    "red",
    "hide-3"
  );
};

module.exports = storageCheckForStoredItems;

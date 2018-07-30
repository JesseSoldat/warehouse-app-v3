// utils
import capitalizeFirstLetter from "../../../../utils/stringManipulation/capitalizeFirstLetter";

const createLocationObj = (productLocation, productId) => {
  let productLocationObj;

  const noProductLocation = {
    haveLocation: false,
    data: [{ label: "Label", value: "" }, { label: "Type", value: "" }]
  };

  // No Product Location -----------------------------------------
  if (!productLocation) {
    productLocationObj = noProductLocation;
  }
  // Have a Product Location -----------------------------------------
  else {
    const { kind, item } = productLocation;

    if (!kind || !item) {
      productLocationObj = noProductLocation;
      return;
    }

    let label, key, place, spotId, shelfId, rackId, storageId;

    if (kind === "shelfSpot") {
      key = "spotLabel";
      label = "Spot Label";
      place = item === null ? "" : item[key];
      spotId = item._id;
      shelfId = item.shelf._id;
      rackId = item.shelf.rack._id;
      storageId = item.shelf.rack.storage._id;
    }

    if (kind === "box") {
      key = "boxLabel";
      label = "Box Label";
      place = item === null ? "" : item[key];
      spotId = item.shelfSpot._id;
      shelfId = item.shelfSpot.shelf._id;
      rackId = item.shelfSpot.shelf.rack._id;
      storageId = item.shelfSpot.shelf.rack.storage._id;
    }

    productLocationObj = {
      haveLocation: true,
      kind,
      data: [
        { label: label, value: place },
        { label: "Type", value: capitalizeFirstLetter(kind) }
      ],
      breadcrumb: {
        productId,
        spotId,
        shelfId,
        rackId,
        storageId
      }
    };
  }
  return productLocationObj;
};

export default createLocationObj;

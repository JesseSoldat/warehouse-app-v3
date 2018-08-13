// utils
import capitalizeFirstLetter from "../../../../utils/stringManipulation/capitalizeFirstLetter";

const createLocationObj = (productLocation, productId) => {
  let productLocationObj;

  console.log(productLocation);

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

    let label, key, place;
    let breadcrumb = { productId };

    if (kind === "shelfSpot") {
      key = "shelfSpotLabel";
      label = "Spot Label";
      place = item === null ? "" : item[key];
      breadcrumb["haveLocation"] = true;
      breadcrumb["spotId"] = item._id;
      breadcrumb["shelfId"] = item.shelf._id;
      breadcrumb["rackId"] = item.shelf.rack._id;
      breadcrumb["storageId"] = item.shelf.rack.storage._id;
    }

    if (kind === "box") {
      key = "boxLabel";
      label = "Box Label";
      breadcrumb["haveLocation"] = false;
      breadcrumb["boxId"] = item._id;
      place = item === null ? "" : item[key];

      // The BOX has been stored on a SHELFSPOT
      if (item.shelfSpot) {
        breadcrumb["haveLocation"] = true;
        breadcrumb["spotId"] = item.shelfSpot._id;
        breadcrumb["shelfId"] = item.shelfSpot.shelf._id;
        breadcrumb["rackId"] = item.shelfSpot.shelf.rack._id;
        breadcrumb["storageId"] = item.shelfSpot.shelf.rack.storage._id;
      }
    }

    productLocationObj = {
      haveLocation: true,
      kind,
      data: [
        { label: label, value: place },
        { label: "Type", value: capitalizeFirstLetter(kind) }
      ],
      breadcrumb
    };
  }
  return productLocationObj;
};

export default createLocationObj;

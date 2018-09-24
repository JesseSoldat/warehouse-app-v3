import moment from "moment";

// helper
import isEmpty from "../../../../utils/validation/isEmpty";

const getEditStateObj = product => {
  const dateCheckbox = isEmpty(product.manufacturingDate) ? false : true;

  const manufacturingDate = isEmpty(product.manufacturingDate)
    ? moment()
    : moment(product.manufacturingDate);

  const editStateObj = {
    // strings
    brandName: product.brandName || "",
    productName: product.productName || "",
    pointOfBuy: product.pointOfBuy || "",
    // numbers
    price: product.price || 0,
    weight: product.weight || 0,
    quantity: product.quantity || 1,
    amountOfPieces: product.amountOfPieces || 0,
    // Date
    dateCheckbox,
    manufacturingDate,
    // arrays
    productPictures: product.productPictures.join() || "",
    productMaterial: product.productMaterial.join() || "",
    comments: product.comments.join() || "",
    // objects
    prodHeight: product.productMeasurements.prodHeight || 0,
    prodWidth: product.productMeasurements.prodWidth || 0,
    prodLength: product.productMeasurements.prodLength || 0,
    packHeight: product.packagingMeasurements.packHeight || 0,
    packWidth: product.packagingMeasurements.packWidth || 0,
    packLength: product.packagingMeasurements.packLength || 0
  };

  // console.log("stateObj", editStateObj);

  return editStateObj;
};
export default getEditStateObj;

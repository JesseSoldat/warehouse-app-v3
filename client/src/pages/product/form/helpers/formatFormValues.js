// helpers
import formatMeasurementValues from "./formatMeasurementValues";
// utils
import splitStrToArray from "../../../../utils/stringManipulation/splitStrToArray";

const formatFormValues = state => {
  const {
    brandName,
    productName,
    price,
    pointOfBuy,
    weight,
    quantity,
    manufacturingDate,
    dateCheckbox,
    amountOfPieces,
    comments,
    productMaterial,
    selectedProducer,
    selectedCustomers
    // ------- Don't update these --------
    // productPictures,
    // packagingPictures,
  } = state;

  const formattedValues = {
    brandName: brandName || "",
    productName: productName || "",
    price: price || 0,
    pointOfBuy: pointOfBuy || "",
    amountOfPieces: amountOfPieces || 0,
    weight: weight || 0,
    quantity: quantity || 1,

    productMaterial: splitStrToArray(productMaterial, ",") || [],
    comments: splitStrToArray(comments, ",") || [],

    productMeasurements:
      formatMeasurementValues("productMeasurements", state) || {},
    packagingMeasurements:
      formatMeasurementValues("packagingMeasurements", state) || {},

    producerId: selectedProducer.value || "",
    customerIds: selectedCustomers.map(obj => obj.value) || []
  };

  const haveManufacturingDate = dateCheckbox ? manufacturingDate : null;

  if (haveManufacturingDate) {
    formattedValues["manufacturingDate"] = manufacturingDate;
  }
  // console.log(formattedValues);
  return formattedValues;
};

export default formatFormValues;

import moment from "moment";

const getInitialState = () => {
  return {
    // strings
    brandName: "",
    productName: "",
    pointOfBuy: "",
    // Numbers
    price: 0,
    amountOfPieces: 0,
    quantity: 1,
    weight: 0,
    // Date
    manufacturingDate: moment(),
    dateCheckbox: false,
    // Array of Strings
    productMaterial: "",
    comments: "",
    // Obj
    prodHeight: 0,
    prodWidth: 0,
    prodLength: 0,
    packHeight: 0,
    packWidth: 0,
    packLength: 0
  };
};

export default getInitialState;

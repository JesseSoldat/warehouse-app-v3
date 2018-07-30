// fields for creating a customer
// err is the name of the the error in component state
// msg is what should be set in state if the field is empty on submit

const productFieldData = [
  {
    placeholder: "* Product Name ",
    name: "productName",
    err: "productNameErr",
    msg: "Product name is a required field!"
  },
  {
    placeholder: "* Brand Name",
    name: "brandName",
    err: "brandNameErr",
    msg: "Brand name is a required field!"
  },
  {
    placeholder: "Price",
    name: "price",
    type: "number",
    err: null,
    msg: null
  },
  {
    placeholder: "Point of Buy",
    name: "pointOfBuy",
    err: null,
    msg: null
  },
  {
    placeholder: "Weight",
    name: "weight",
    type: "number",
    err: null,
    msg: null
  },
  {
    placeholder: "Product Material",
    name: "productMaterial",
    info: "Please enter a comma seperated list of Product Materials",
    err: null,
    msg: null
  },
  {
    placeholder: "Amount Of Pieces",
    name: "amountOfPieces",
    type: "number",
    err: null,
    msg: null
  },
  {
    placeholder: "Comments",
    name: "comments",
    info: "Please enter a comma seperated list of Comments",
    err: null,
    msg: null
  },
  {
    placeholder: "Quantity",
    name: "quantity",
    type: "number",
    err: null,
    msg: null
  }
];

export default productFieldData;

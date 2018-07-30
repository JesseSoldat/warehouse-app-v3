const moment = require("moment");

const createDetailsArray = product => {
  const {
    productName = "",
    brandName = "",
    pointOfBuy = "",
    amountOfPieces = 0,
    quantity = 0,
    price = 0,
    weight = 0,
    manufacturingDate
  } = product;

  const formatedDate = manufacturingDate
    ? moment(manufacturingDate).format("MMMM Do YYYY")
    : null;

  return [
    { label: "Product", value: productName },
    { label: "Brand", value: brandName },
    { label: "Price", value: price },
    {
      label: "Manufacturing Date",
      value: formatedDate
    },
    { label: "Point of Buy", value: pointOfBuy },
    { label: "Weight", value: weight },
    { label: "# of Pieces", value: amountOfPieces },
    { label: "Quantity", value: quantity }
  ];
};

export default createDetailsArray;

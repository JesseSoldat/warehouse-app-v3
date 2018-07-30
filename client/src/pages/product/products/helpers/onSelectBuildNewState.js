import moment from "moment";

// selectedOptions = value from the select input onChange event
const onSelectBuildNewState = selectedOptions => {
  // string || number || date || orphans
  let searchType;
  // value of first and second input
  let defaultValue = "";
  let defaultValue2 = "";
  // orphanSearch (products without a location)
  let orphanSearch = false;

  switch (selectedOptions) {
    case "productName":
    case "brandName":
    case "comments":
      searchType = "string";
      break;

    case "price":
    case "productLabel":
      searchType = "number";
      break;

    case "manufacturingDate":
      searchType = "date";
      defaultValue = moment();
      defaultValue2 = moment();
      break;

    case "orphans":
      searchType = "orphans";
      orphanSearch = true;
      break;

    default:
      searchType = "string";
      break;
  }

  return {
    searchType,
    searchOption: selectedOptions,
    value: defaultValue,
    value2: defaultValue2,
    disableValue2: true,
    valueErr: "",
    orphanSearch
  };
};

export default onSelectBuildNewState;

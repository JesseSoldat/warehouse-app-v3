const createGetProductsQuery = (query, state) => {
  const { value, value2, disableValue2, searchOption, searchType } = state;

  // UPDATE QUERY with values from STATE -----------
  // get the current select key
  query["keyName"] = searchOption;
  // string || number || date
  query["searchType"] = searchType;
  // value of the first input
  query["value"] = value;

  // only use value2 if the user checks to enable the second input
  disableValue2 ? (query["value2"] = "") : (query["value2"] = value2);

  return query;
};

export default createGetProductsQuery;

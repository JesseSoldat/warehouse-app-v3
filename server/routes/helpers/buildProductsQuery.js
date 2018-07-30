const buildMongoQuery = query => {
  let { searchType, value, value2, keyName } = query;

  let mongoQuery = {};

  // console.log("keyName:", keyName);
  // console.log("value:", value);
  // console.log("value2:", value2);

  switch (searchType) {
    case "number":
    case "date":
      if (!value2) {
        mongoQuery[keyName] = value;
      } else {
        mongoQuery = { $and: [{ [keyName]: { $gte: value, $lte: value2 } }] };
      }
      break;

    case "string":
      mongoQuery[keyName] = { $regex: new RegExp(value), $options: "i" };
      break;

    case "orphans":
      mongoQuery["productLocation"] = null;

    default:
      break;
  }

  return mongoQuery;
};

module.exports = buildMongoQuery;

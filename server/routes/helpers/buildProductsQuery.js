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
        // 86400000 milliseconds in a day
        // 1 Day = 1 * 24 * 60 * 60 * 1000;
        value2 = parseInt(value) + 86400000;
      }

      mongoQuery = { $and: [{ [keyName]: { $gte: value, $lte: value2 } }] };

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

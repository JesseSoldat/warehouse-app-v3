const buildBoxesQuery = query => {
  const { value, searchOption } = query;

  const mongoQuery = {};

  if (searchOption === "boxLabel") {
    mongoQuery[searchOption] = { $regex: new RegExp(value), $options: "i" };
  } else if (searchOption === "orphans") {
    mongoQuery["shelfSpot"] = null;
  }

  return mongoQuery;
};

module.exports = buildBoxesQuery;

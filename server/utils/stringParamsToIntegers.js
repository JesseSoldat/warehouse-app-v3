const stringParamsToIntegers = (query, array) => {
  array.forEach(param => {
    query[param] = parseInt(query[param], 10);
  });
  return query;
};

module.exports = stringParamsToIntegers;

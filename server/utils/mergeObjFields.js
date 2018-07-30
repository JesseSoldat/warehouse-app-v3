const mergeObjFields = (path, objToMerge) => {
  const updatedObj = {};
  let keyToUpdate;

  Object.keys(objToMerge).forEach(key => {
    keyToUpdate = `${path && path + "."}${key}`;
    updatedObj[keyToUpdate] = objToMerge[key];
  });
  return { $set: updatedObj };
};

module.exports = mergeObjFields;

// set any non-array value to an empty array
// array = the value to check
const defaultToEmptyArray = array => (Array.isArray(array) ? array : []);

// array = array of obj {}
const createObjWithAllPropsAsArrays = array => {
  const defaultedObj = {};

  // obj = { key: value }
  // use the obj key for the key in defaultedObj
  // set the value to the current value or an empty array
  array.forEach(obj => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        defaultedObj[key] = defaultToEmptyArray(obj[key]);
      }
    }
  });

  return defaultedObj;
};

export default createObjWithAllPropsAsArrays;

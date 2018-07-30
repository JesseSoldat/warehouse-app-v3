// data unformated data as an array of objs
// labelKey is the key for matching a property in each object to be used for the label property in the new object
// value key is the key for matching a property in each object to be used for the value property in the new object

const formatSelectInputData = (data, labelKey, valueKey) => {
  const options = [];

  data.forEach((obj, i) => {
    options.push({
      label: obj[labelKey],
      value: obj[valueKey]
    });
  });
  return options;
};

export default formatSelectInputData;

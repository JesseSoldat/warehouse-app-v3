import isEmpty from "../validation/isEmpty";

// pass in the string to split and what to split it by
// if nothing is passed split by empty space
const splitStrToArray = (str, splitBy = " ") => {
  if (isEmpty(str)) return [];

  return str.split(splitBy);
};

export default splitStrToArray;

const capitalizeFirstLetter = (str = "") => {
  if (str[0]) {
    return (str = str[0].toUpperCase() + str.slice(1).toLowerCase());
  }
};

export default capitalizeFirstLetter;

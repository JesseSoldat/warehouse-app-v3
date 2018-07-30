const faker = require("faker");

const generateArray = (times, method) => {
  const array = [];
  let i = 0;

  while (i < times) {
    i++;
    switch (method) {
      case "productMaterial":
        array.push(faker.commerce.productMaterial());
        break;

      case "productAdjective":
        array.push(faker.commerce.productAdjective());
        break;

      case "image":
        array.push(faker.image.image());
        break;

      case "avatar":
        array.push(faker.image.avatar());
        break;

      default:
        break;
    }
  }
  return array;
};

module.exports = generateArray;

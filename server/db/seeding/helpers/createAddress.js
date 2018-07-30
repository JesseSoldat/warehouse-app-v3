const faker = require("faker");

const createAddress = () => {
  const strAddress = faker.address.streetAddress();
  const strName = faker.address.streetName();
  const zip = faker.address.zipCode();
  const city = faker.address.city();
  const country = faker.address.country();

  return `${strAddress} ${strName}, ${city}, ${country}, ${zip}`;
};

module.exports = createAddress;

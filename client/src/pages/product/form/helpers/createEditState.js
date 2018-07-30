// helpers
import getInitialState from "./getInitialState";
import getEditStateObj from "./getEditStateObj";

// product = raw api data
const createEditState = product => {
  // NO product from API ---------------------------------------------
  // set defaults if this product does not have a producer or any clients
  let selectedProducer = "";
  let selectedCustomers = [];
  // get the intial state of an empty product form
  let productObj = getInitialState();

  // API has returned a product -----------------------------------
  if (product) {
    // create child's state obj with raw product data
    productObj = getEditStateObj(product);

    const { producer, customer } = product;

    // set child form's state with this product's producer
    if (producer) {
      selectedProducer = {
        label: producer.producerName,
        value: producer._id
      };
    }

    // set child form's state with this product's customers
    if (customer) {
      selectedCustomers = customer.map(obj => ({
        label: obj.customerName,
        value: obj._id
      }));
    }
  }

  return { productObj, selectedProducer, selectedCustomers };
};

export default createEditState;

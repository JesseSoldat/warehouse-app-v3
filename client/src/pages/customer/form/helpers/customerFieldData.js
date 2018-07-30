// fields for creating a customer
// err is the name of the the error in component state
// msg is what should be set in state if the field is empty on submit

const customerFieldData = [
  {
    placeholder: "* Name ",
    name: "customerName",
    err: "customerNameErr",
    msg: "Customer name is a required field!"
  },
  {
    placeholder: "Contact",
    name: "customerContact",
    err: null,
    msg: null
  },
  {
    placeholder: "Address",
    name: "customerAddress",
    err: null,
    msg: null
  }
];

export default customerFieldData;

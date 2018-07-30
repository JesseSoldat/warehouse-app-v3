// fields for creating a producer
// err is the name of the the error in component state
// msg is what should be set in state if the field is empty on submit

const producerFieldData = [
  {
    placeholder: "* Name ",
    name: "producerName",
    err: "producerNameErr",
    msg: "Producer name is a required field!"
  },
  {
    placeholder: "Contact",
    name: "producerContact",
    err: null,
    msg: null
  },
  {
    placeholder: "Address",
    name: "producerAddress",
    err: null,
    msg: null
  }
];

export default producerFieldData;

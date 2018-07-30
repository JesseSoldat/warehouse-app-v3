// fieldData = an array with nested objects
// [{
//   placeholder: "Name ",
//   name: "producerName",
//   err: "producerNameErr", // if not required this is NULL
//   msg: "Producer name is a required field!" // if not required this is NULL
// }];
// state = current component state

const validateRequiredFieldsOnSubmit = (fieldData, state) => {
  const errObj = {};
  let isValid = true;

  fieldData.forEach(obj => {
    // Not a required field
    if (!obj["err"] || !obj["msg"]) return;

    // the field is required
    const fieldName = obj["name"];

    // get the value in state
    const stateValue = state[fieldName];

    // the field is has no value
    if (stateValue === "") {
      isValid = false;
      // get the name and msg of the error
      const fieldErrorName = obj["err"];
      const fieldErrorMsg = obj["msg"];
      // set the name of the error to the error obj
      errObj[fieldErrorName] = fieldErrorMsg;
    }
  });

  return { isValid, errObj };
};

export default validateRequiredFieldsOnSubmit;

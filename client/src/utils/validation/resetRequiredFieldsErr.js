// fieldData = an array with nested objects
// [{
//   placeholder: "Name ",
//   name: "producerName",
//   err: "producerNameErr", // if not required this is NULL
//   msg: "Producer name is a required field!" // if not required this is NULL
// }];

// name = the name attribute on the input
// value = the value of the field in state

const resetRequiredFieldsErr = (fieldData, { name, value }) => {
  const newErrorState = {};
  let shouldRemoveError = false;

  fieldData.forEach(obj => {
    // Not a required field in the fieldData
    if (!obj["err"] || !obj["msg"]) return;
    // Check that the current obj matches the current field
    if (obj["name"] !== name) return;

    // check if the field has a value
    if (value !== "") {
      shouldRemoveError = true;
      // get the name of the error
      const fieldErrorName = obj["err"];
      // set the name of the error to the newErrorState obj
      newErrorState[fieldErrorName] = null;
    }
  });

  return shouldRemoveError ? newErrorState : null;
};

export default resetRequiredFieldsErr;

import storageFieldData from "./storageFieldData";

const validateForm = (storageType, formType, state) => {
  let isValid = true;
  // create err msg for empty fields
  const errsObj = {};
  // create the form to be sent
  const form = {};

  let storage = storageFieldData[storageType];
  if (formType === "create") {
    storage = storage.filter(obj => obj.err !== null && !obj.showOnlyOnEdit);
  } else {
    storage = storage.filter(obj => obj.err !== null);
  }

  storage.forEach(obj => {
    const name = obj.name;
    const value = state[name];

    form[name] = value;

    if (value === "") {
      isValid = false;
      errsObj[obj.err] = obj.msg;
    }
  });

  return { isValid, errsObj, form };
};

export default validateForm;

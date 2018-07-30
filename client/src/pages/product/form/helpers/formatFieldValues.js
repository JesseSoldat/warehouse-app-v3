// helpers
import textInputFields from "./textInputFields";

// format an array of objs
const formatFieldValues = state => {
  const formatedTextInputFields = textInputFields.map(obj => {
    const fieldName = obj.name;
    return state[fieldName];
  });

  console.log(formatedTextInputFields);
};

export default formatFieldValues;

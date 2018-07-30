// helpers
// format client data to work with react-select api
import formatSelectInputData from "../../../../components/inputs/helpers/formatSelectInputData";

// return raw data shaped to thr react-select-api needs
const formatClientSelectOptions = (producerOptions, customerOptions) => {
  const producerSelectOptions = formatSelectInputData(
    producerOptions,
    "producerName",
    "_id"
  );
  // console.log("producer", producerSelectOptions);

  const customerSelectOptions = formatSelectInputData(
    customerOptions,
    "customerName",
    "_id" // Edit flow get the saved customers
  );
  // console.log("customer", customerSelectOptions);
  return { producerSelectOptions, customerSelectOptions };
};

export default formatClientSelectOptions;

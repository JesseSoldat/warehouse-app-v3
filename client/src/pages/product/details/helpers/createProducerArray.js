import isEmpty from "../../../../utils/validation/isEmpty";

const createProducerArray = producer => {
  let producerArray = [];

  // producer was not passed in create defaults -----------
  if (isEmpty(producer)) {
    producerArray = [
      {
        label: "Producer",
        data: [
          { label: "Name", value: "" },
          { label: "Contact", value: "" },
          { label: "Address", value: "" }
        ]
      }
    ];
    // use producer values --------------------------------
  } else {
    const { producerName, producerAddress, producerContact } = producer;
    producerArray = [
      {
        label: "Producer",
        data: [
          { label: "Name", value: producerName },
          { label: "Contact", value: producerAddress },
          { label: "Address", value: producerContact }
        ]
      }
    ];
  }

  return producerArray;
};

export default createProducerArray;

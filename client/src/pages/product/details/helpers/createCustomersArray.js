const defaultValueArray = [
  [
    {
      label: "Customer Details",
      data: [
        { label: "Name", value: "" },
        { label: "Address", value: "" },
        { label: "Contact", value: "" }
      ]
    }
  ]
];

const createCustomersArray = array => {
  if (array.length === 0) return defaultValueArray;
  let label = "";

  const objArray = array.map((obj, i) => {
    const { customerName, customerAddress, customerContact } = obj;
    i === 0 ? (label = "Customer Details") : (label = "");
    return [
      {
        label,
        data: [
          { label: "Name", value: customerName },
          { label: "Address", value: customerAddress },
          { label: "Contact", value: customerContact }
        ]
      }
    ];
  });
  return objArray;
};

export default createCustomersArray;

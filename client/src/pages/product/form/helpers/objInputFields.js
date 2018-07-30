// Measurements fields is an array of objs
// each obj has a parent property and fields property
// fields is an array of objs

const objInputFields = [
  {
    parent: "Product Measurements: ",
    fields: [
      {
        placeholder: "Height",
        name: "prodHeight",
        type: "number"
      },
      {
        placeholder: "Width",
        name: "prodWidth",
        type: "number"
      },
      {
        placeholder: "Length",
        name: "prodLength",
        type: "number"
      }
    ]
  },
  {
    parent: "Packaging Measurements: ",
    fields: [
      {
        placeholder: "Height",
        name: "packHeight",
        type: "number",
        parent: "Packaging Measurements: "
      },
      {
        placeholder: "Width",
        name: "packWidth",
        type: "number",
        parent: "Packaging Measurements: "
      },
      {
        placeholder: "Length",
        name: "packLength",
        type: "number",
        parent: "Packaging Measurements: "
      }
    ]
  }
];

export default objInputFields;

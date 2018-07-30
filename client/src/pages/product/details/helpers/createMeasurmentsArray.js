const createMeasurmentsArray = (productMeasurments, packagingMeasurments) => {
  let prodHeight, prodLength, prodWidth, packHeight, packLength, packWidth;

  if (!productMeasurments || !packagingMeasurments) {
  } else {
    // from api raw obj to single values
    prodHeight = productMeasurments.prodHeight;
    prodLength = productMeasurments.prodLength;
    prodWidth = productMeasurments.prodWidth;
    packHeight = packagingMeasurments.packHeight;
    packLength = packagingMeasurments.packLength;
    packWidth = packagingMeasurments.packWidth;
  }

  return [
    // create data for the components api to loop over
    {
      label: "Product Measurments",
      data: [
        { label: "Height", value: prodHeight ? prodHeight : 0 },
        { label: "Width", value: prodWidth ? prodWidth : 0 },
        { label: "Length", value: prodLength ? prodLength : 0 }
      ]
    },
    {
      label: "Packaging Measurments",
      data: [
        { label: "Height", value: packHeight ? packHeight : 0 },
        { label: "Width", value: packWidth ? packWidth : 0 },
        { label: "Length", value: packLength ? packLength : 0 }
      ]
    }
  ];
};

export default createMeasurmentsArray;

const createMeasurementsArray = (
  productMeasurements,
  packagingMeasurements
) => {
  let prodHeight, prodLength, prodWidth, packHeight, packLength, packWidth;

  if (!productMeasurements || !packagingMeasurements) {
  } else {
    // from api raw obj to single values
    prodHeight = productMeasurements.prodHeight;
    prodLength = productMeasurements.prodLength;
    prodWidth = productMeasurements.prodWidth;
    packHeight = packagingMeasurements.packHeight;
    packLength = packagingMeasurements.packLength;
    packWidth = packagingMeasurements.packWidth;
  }

  return [
    // create data for the components api to loop over
    {
      label: "Product Measurements",
      data: [
        { label: "Height", value: prodHeight ? prodHeight : 0 },
        { label: "Width", value: prodWidth ? prodWidth : 0 },
        { label: "Length", value: prodLength ? prodLength : 0 }
      ]
    },
    {
      label: "Packaging Measurements",
      data: [
        { label: "Height", value: packHeight ? packHeight : 0 },
        { label: "Width", value: packWidth ? packWidth : 0 },
        { label: "Length", value: packLength ? packLength : 0 }
      ]
    }
  ];
};

export default createMeasurementsArray;

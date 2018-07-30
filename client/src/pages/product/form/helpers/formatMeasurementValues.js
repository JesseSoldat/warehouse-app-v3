const formatMeasurmentsValues = (type, state) => {
  const {
    prodHeight,
    prodWidth,
    prodLength,
    packHeight,
    packWidth,
    packLength
  } = state;

  const obj = {};

  switch (type) {
    case "productMeasurments":
      obj["prodHeight"] = parseInt(prodHeight, 10) || 0;
      obj["prodWidth"] = parseInt(prodWidth, 10) || 0;
      obj["prodLength"] = parseInt(prodLength, 10) || 0;
      break;

    case "packagingMeasurments":
      obj["packHeight"] = parseInt(packHeight, 10) || 0;
      obj["packWidth"] = parseInt(packWidth, 10) || 0;
      obj["packLength"] = parseInt(packLength, 10) || 0;
      break;

    default:
      break;
  }

  return { ...obj };
};

export default formatMeasurmentsValues;

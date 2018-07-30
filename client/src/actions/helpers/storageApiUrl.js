const storageApiUrl = type => {
  let apiUrl;
  switch (type) {
    case "storage":
      apiUrl = "/api/storages";
      break;

    case "rack":
      apiUrl = "/api/racks";
      break;

    case "shelf":
      apiUrl = "/api/shelves";
      break;

    case "shelfSpot":
      apiUrl = "/api/shelfSpots";
      break;

    case "box":
      apiUrl = "/api/boxes";
      break;

    default:
      apiUrl = "";
  }
  return apiUrl;
};

export default storageApiUrl;

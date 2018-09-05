export const breadCrumbLinks = ids => {
  const {
    productId = "",
    producerId = "",
    customerId = "",
    storageId = "",
    rackId = "",
    shelfId = "",
    shelfSpotId = "",
    boxId = ""
  } = ids;

  return {
    dashboard: "/dashboard",
    products: "/products/search",
    product: `/products/${productId}`,
    producers: "/producers/search",
    producer: `/producers/${producerId}`,
    customers: "/customers/search",
    customer: `/customers/${customerId}`,
    storages: "/storages",
    storage: `/storage/${storageId}`,
    rack: `/rack/${storageId}/${rackId}?type=rack`,
    shelf: `/shelf/${storageId}/${rackId}/${shelfId}?type=shelf`,
    shelfspot: `/shelfSpot/${storageId}/${rackId}/${shelfId}/${shelfSpotId}?type=shelfSpot`,
    box: `/box/${boxId}?type=box`,
    boxLocation: `/box/${storageId}/${rackId}/${shelfId}/${shelfSpotId}/${boxId}?type=box`,
    store: "/barcode/scan?type=linkBoxToSpot"
  };
};

export default breadCrumbLinks;

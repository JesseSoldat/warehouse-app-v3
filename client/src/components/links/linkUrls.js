const linkUrls = {
  Login: "/login",
  Register: "/register",
  Search: "/search",
  Products: "/products/search",
  Producers: "/producers/search",
  Customers: "/customers/search",
  Storages: "/storages/search",
  Scan: "/barcode/scan",
  Create: "/create",
  NewProduct: "/products/create",
  NewProducer: "/producers/create",
  NewCustomer: "/customers/create",
  NewStorageBox: "/box/create?type=box",
  Storage: "/storages",
  Admin: "/admin",
  ManageUser: "/admin/manageUsers"
};

const getLinkUrls = key => {
  let formattedKey = key.split(" ").join("");
  return linkUrls[formattedKey];
};

export default getLinkUrls;

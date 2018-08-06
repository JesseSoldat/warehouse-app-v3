const allRoutes = {
  // GENERAL ROUTES -----------------
  "/dashboard": {
    text: "Welcome"
  },
  // ADMIN ROUTES ------------------
  "/admin/manageUsers": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Admin"
  },
  // PRODUCT ROUTES -----------------
  "/products/search": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Search"
  },
  "/products/:productId": {
    link1: "Products",
    url1: "/products/search",
    text: "Details"
  },
  "/products/edit/:productId": {
    link1: "Products",
    url1: "/products/search",
    link2: "Details",
    url2: "/products/:productId",
    text: "Edit"
  },
  "/products/create": {
    link1: "Products",
    url1: "/products/search",
    text: "Create"
  },
  // PRODUCERS ROUTES ------------
  "/producers/search": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Search"
  },
  "/producers/:producerId": {
    link1: "Producers",
    url1: "/producers/search",
    text: "Details"
  },
  "/producers/edit/:producerId": {
    link1: "Producers",
    url1: "/producers/search",
    link2: "Details",
    url2: "/producers/:producerId",
    text: "Edit"
  },
  "/producers/create": {
    link1: "Producers",
    url1: "/producers/search",
    text: "Create"
  },
  // CUSTOMERS ROUTES ------------
  "/customers/search": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Search"
  },
  "/customers/:customerId": {
    link1: "Customers",
    url1: "/customers/search",
    text: "Details"
  },
  "/customers/edit/:customerId": {
    link1: "Customers",
    url1: "/customers/search",
    link2: "Details",
    url2: "/customers/:customerId",
    text: "Edit"
  },
  "/customers/create": {
    link1: "Customers",
    url1: "/customers/search",
    text: "Create"
  },
  // STORAGES ROUTES -------------
  "/storages/search": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Search"
  },
  "/storages": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Search"
  },
  "/storages/single/:id": {
    link1: "Storages",
    url1: "/storages",
    text: "Details"
  },
  "/storages/create/:id": {
    link1: "Storages",
    url1: "/storages",
    text: "Create"
  },
  // BARCODE ROUTES -------------
  "/barcode/scan": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Search"
  },
  "/barcode/create": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Search"
  },
  // PLAYGROUND ROUTES -------------
  "/admin/playGround": {
    link1: "Dashboard",
    url1: "/dashboard",
    text: "Playground"
  }
};

const params = {};

export default allRoutes;

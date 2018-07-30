import {
  PRODUCTS_FETCH_ALL,
  PRODUCTS_FETCH_ONE,
  PRODUCTS_RESET
} from "../actions/product";

const initialState = {
  products: [],
  product: null,
  query: {
    page: 1,
    skip: 0,
    limit: 20,
    count: 0, // can be filtered
    totalCount: 0, // all of the products
    keyName: null,
    value: null,
    value2: null,
    searchType: "string"
  }
};

export default (state = initialState, action) => {
  const { type, products, product, query } = action;
  switch (type) {
    case PRODUCTS_FETCH_ALL:
      // console.log("PRODUCTS_FETCH_ALL", products);
      return { ...state, products, query };

    case PRODUCTS_FETCH_ONE:
      // console.log("PRODUCTS_FETCH_ONE", product);
      return { ...state, product };

    case PRODUCTS_RESET:
      return { ...initialState };

    default:
      return { ...state };
  }
};

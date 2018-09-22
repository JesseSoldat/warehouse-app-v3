import {
  // All Products
  PRODUCTS_REQUESTED,
  PRODUCTS_LOADED,
  // Single Product
  PRODUCT_REQUESTED,
  PRODUCT_LOADED,
  // Reset
  PRODUCTS_RESET
} from "../actions/product";

const initialState = {
  productEntity: null,
  productOrder: [],
  products: [],
  product: null,
  // All Products
  productsRequest: false,
  productsLoaded: false,
  // Single Product
  productRequest: false,
  productLoaded: false,
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
  const { type, productEntity, productOrder, product, query } = action;
  switch (type) {
    // All Products
    case PRODUCTS_REQUESTED:
      return {
        ...state,
        productsRequest: true,
        productsLoaded: false
      };

    case PRODUCTS_LOADED:
      const products = [];
      // product order is only the IDS
      // products needs to be populated with the productEntity in the correct order
      productOrder.forEach(id => products.push(productEntity[id]));

      return {
        ...state,
        productEntity,
        productOrder,
        products,
        query,
        productsRequest: false,
        productsLoaded: true
      };

    // Single Product
    case PRODUCT_REQUESTED:
      return {
        ...state,
        productsRequest: true,
        productsLoaded: false
      };

    case PRODUCT_LOADED:
      return {
        ...state,
        product,
        productsRequest: false,
        productsLoaded: true
      };

    // Reset Products State
    case PRODUCTS_RESET:
      return {
        ...state,
        productEntity: null,
        productOrder: [],
        products: [],
        product: null,
        // All Products
        productsRequest: false,
        productsLoaded: false,
        // Single Product
        productRequest: false,
        productLoaded: false,
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

    default:
      return { ...state };
  }
};

import {
  // All Products
  PRODUCTS_REQUESTED,
  PRODUCTS_LOADED,
  // Single Product
  PRODUCT_REQUESTED,
  PRODUCT_LOADED,
  // Update
  PRODUCT_CREATED,
  PRODUCT_EDITED,
  PRODUCT_DELETED
} from "../actions/product";
import {
  LINK_PRODUCT_TO_BOX,
  LINK_PRODUCT_TO_SHELFSPOT,
  LINK_BOX_TO_SHELFSPOT
} from "../actions/link";
import {
  UNLINK_BOX_FROM_SHELFSPOT,
  UNLINK_PRODUCT_FROM_BOX,
  UNLINK_PRODUCT_FROM_SHELFSPOT
} from "../actions/unlink";

const initialQuery = {
  page: 1,
  skip: 0,
  limit: 20,
  count: 0, // can be filtered
  totalCount: 0, // all of the products
  keyName: null,
  value: null,
  value2: null,
  searchType: "string"
};

const initialState = {
  productEntity: null,
  productOrder: [],
  products: [],
  product: null,
  query: initialQuery
};

export default (state = initialState, action) => {
  const { type, productEntity, productOrder, product, update, query } = action;
  switch (type) {
    // All Products
    case PRODUCTS_REQUESTED:
      return {
        ...state
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
        ...state
      };

    case PRODUCT_LOADED:
      return {
        ...state,
        products: [],
        product
      };

    case PRODUCT_CREATED:
    case PRODUCT_EDITED:
    case PRODUCT_DELETED:
      return {
        ...initialState
      };

    // Link
    case LINK_PRODUCT_TO_BOX:
    case LINK_PRODUCT_TO_SHELFSPOT:
      return {
        ...state,
        products: [],
        productEntity: null,
        productOrder: [],
        product: update.product
      };
    case LINK_BOX_TO_SHELFSPOT:
      return {
        ...initialState
      };
    // UnLink
    case UNLINK_PRODUCT_FROM_SHELFSPOT:
      return {
        ...state,
        productEntity: null,
        productOrder: [],
        products: [],
        product: update.product
      };
    case UNLINK_BOX_FROM_SHELFSPOT:
      return {
        ...initialState
      };
    case UNLINK_PRODUCT_FROM_BOX:
      return {
        ...state,
        productEntity: null,
        productOrder: [],
        products: [],
        product: update.product
      };

    default:
      return { ...state };
  }
};

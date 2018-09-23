import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
import createEntity from "./helpers/createEntity";
// actions
import { customersRequested, customersLoaded } from "./customer";
import { producersRequested, producersLoaded } from "./producer";
import { resetStorage } from "./storage";
// types
// all products
export const PRODUCTS_REQUESTED = "PRODUCTS_REQUESTED";
export const PRODUCTS_LOADED = "PRODUCTS_LOADED";
// single product
export const PRODUCT_REQUESTED = "PRODUCT_REQUESTED";
export const PRODUCT_LOADED = "PRODUCT_LOADED";

export const PRODUCTS_RESET = "PRODUCTS_RESET";

const getProductsQueryUrl = query => {
  const { skip, limit, page, keyName, value, value2, searchType } = query;
  const baseUrl = "/api/products";
  const params = `?skip=${skip}&limit=${limit}&page=${page}&keyName=${keyName}&value=${value}&value2=${value2}&searchType=${searchType}`;

  return `${baseUrl}${params}`;
};

// Reset Filter -------------------------------------------------------------
export const resetProducts = () => ({
  type: PRODUCTS_RESET
});

// All Products or a subset based on the query ------------------------------
export const productsRequested = () => ({
  type: PRODUCTS_REQUESTED
});

export const productsLoaded = (productEntity, productOrder, query) => ({
  type: PRODUCTS_LOADED,
  productEntity,
  productOrder,
  query
});

export const startGetProducts = query => async dispatch => {
  dispatch(productsRequested());

  try {
    const res = await axios.get(getProductsQueryUrl(query));

    const { msg, payload, options } = res.data;

    const { query: q, products } = payload;

    const { entity: productEntity, order: productOrder } = createEntity(
      products
    );

    dispatch(productsLoaded(productEntity, productOrder, q));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "products");
  }
};

// Product Details ----------------------------------------------------------
export const productRequested = () => ({
  type: PRODUCT_REQUESTED
});

export const productLoaded = product => ({
  type: PRODUCT_LOADED,
  product
});

export const startGetProduct = productId => async dispatch => {
  dispatch(productRequested());

  try {
    const res = await axios.get(`/api/products/${productId}`);

    const { msg, payload, options } = res.data;

    dispatch(productLoaded(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "product");
  }
};

// Product ( Customers & Producers) -----------------------------------------
export const startGetClients = () => async dispatch => {
  dispatch(customersRequested());
  dispatch(producersRequested());

  try {
    const res = await axios.get("/api/products/clients");

    const { msg, payload, options } = res.data;
    const { customers, producers } = payload;

    // CUSTOMERS
    const { entity: customerEntity, order: customerOrder } = createEntity(
      customers
    );

    dispatch(customersLoaded(customerEntity, customerOrder));

    // PRODUCERS
    const { entity: producerEntity, order: producerOrder } = createEntity(
      producers
    );
    dispatch(producersLoaded(producerEntity, producerOrder));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "form data");
  }
};

// Product ( Product & Customers & Producers) -------------------
export const startGetProductWithClients = productId => async dispatch => {
  dispatch(customersRequested());
  dispatch(producersRequested());

  try {
    const res = await axios.get(
      `/api/products/productWithClients/${productId}`
    );

    const { msg, payload, options } = res.data;
    const { product, customers, producers } = payload;

    // SINGLE PRODUCT
    dispatch(productLoaded(product));

    // CUSTOMERS
    const { entity: customerEntity, order: customerOrder } = createEntity(
      customers
    );
    dispatch(customersLoaded(customerEntity, customerOrder));

    // PRODUCERS
    const { entity: producerEntity, order: producerOrder } = createEntity(
      producers
    );
    dispatch(producersLoaded(producerEntity, producerOrder));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "form data");
  }
};

// Create Product -----------------------------------------------
export const createProduct = (newProduct, history) => async dispatch => {
  try {
    const res = await axios.post("/api/products", newProduct);

    const { msg, payload, options } = res.data;

    dispatch(resetProducts());

    checkForMsg(msg, dispatch, options, "productActionCreateProduct");

    history.push(`/products/${payload._id}`);
  } catch (err) {
    axiosResponseErrorHandling(
      err,
      dispatch,
      "save",
      "product",
      "productActionCreateProductMsg"
    );
  }
};

// Edit Product -----------------------------------------------
export const editProduct = (productId, update, history) => async dispatch => {
  try {
    const res = await axios.patch(`/api/products/${productId}`, update);

    const { msg, options } = res.data;

    dispatch(resetProducts());

    checkForMsg(msg, dispatch, options, "productActionEditProduct");

    history.push(`/products/${productId}`);
  } catch (err) {
    axiosResponseErrorHandling(
      err,
      dispatch,
      "update",
      "product",
      "productActionEditProductMsg"
    );
  }
};

// Delete Product -----------------------------------------------
export const deleteProduct = (productId, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/products/${productId}`);

    const { msg, options } = res.data;

    dispatch(resetProducts());

    dispatch(resetStorage());

    checkForMsg(msg, dispatch, options, "productActionDeleteProduct");

    history.push("/products/search");
  } catch (err) {
    axiosResponseErrorHandling(
      err,
      dispatch,
      "delete",
      "product",
      "productActionDeleteProductMsg"
    );
  }
};

import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
import { getProducers } from "./producer";
import { getCustomers } from "./customer";
// types
export const PRODUCTS_FETCH_ALL = "PRODUCTS_FETCH_ALL";
export const PRODUCTS_FETCH_ONE = "PRODUCTS_FETCH_ONE";
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
export const getProducts = ({ products, query }) => ({
  type: PRODUCTS_FETCH_ALL,
  products,
  query
});

export const startGetProducts = query => async dispatch => {
  dispatch(loading(true));

  try {
    const res = await axios.get(getProductsQueryUrl(query));

    const { msg, payload, options } = res.data;

    dispatch(getProducts(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "products");
  }
};

// Product Details ----------------------------------------------------------
export const getProductDetails = product => ({
  type: PRODUCTS_FETCH_ONE,
  product
});

export const startGetProductDetails = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`);

    const { msg, payload, options } = res.data;

    dispatch(getProductDetails(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "product");
  }
};

// Product ( Customers & Producers) -----------------------------------------
export const startGetClients = () => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.get("/api/products/clients");

    const { msg, payload, options } = res.data;
    const { customers, producers } = payload;

    dispatch(getCustomers(customers));
    dispatch(getProducers(producers));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "form data");
  }
};

// Product ( Product & Customers & Producers) -------------------
export const startGetProductWithClients = productId => async dispatch => {
  dispatch(loading(true));
  try {
    const res = await axios.get(
      `/api/products/productWithClients/${productId}`
    );

    const { msg, payload, options } = res.data;
    const { product, customers, producers } = payload;

    dispatch(getProductDetails(product));
    dispatch(getCustomers(customers));
    dispatch(getProducers(producers));
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

    checkForMsg(msg, dispatch, options);

    const productId = payload._id;

    history.push(`/products/${productId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "save", "product");
  }
};

// Edit Product -----------------------------------------------
export const editProduct = (productId, update, history) => async dispatch => {
  try {
    const res = await axios.patch(`/api/products/${productId}`, update);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push(`/products/${productId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "update", "product");
  }
};

// Delete Product -----------------------------------------------
export const deleteProduct = (productId, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/products/${productId}`);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push("/products/search");
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", "product");
  }
};

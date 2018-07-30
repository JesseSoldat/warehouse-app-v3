import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
// types
export const CUSTOMERS_FETCH_ALL = "CUSTOMERS_FETCH_ALL";
export const CUSTOMERS_FETCH_ONE = "CUSTOMERS_FETCH_ONE";

// Get all customers -------------------------------
export const getCustomers = customers => ({
  type: CUSTOMERS_FETCH_ALL,
  customers
});

export const startGetCustomers = () => async dispatch => {
  dispatch(loading(true));

  try {
    const res = await axios.get("/api/customers");

    const { msg, payload, options } = res.data;

    dispatch(getCustomers(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "customers");
  }
};
// Get one customer ----------------------------------
export const getCustomer = customer => ({
  type: CUSTOMERS_FETCH_ONE,
  customer
});

export const startGetCustomer = customerId => async dispatch => {
  dispatch(loading(true));

  try {
    const res = await axios.get(`/api/customers/${customerId}`);

    const { msg, payload, options } = res.data;

    dispatch(getCustomer(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "customer");
  }
};
// Create a new customer -----------------------------
export const startCreateCustomer = (data, history) => async dispatch => {
  try {
    const res = await axios.post("/api/customers", data);

    const { msg, payload, options } = res.data;

    checkForMsg(msg, dispatch, options);

    const customerId = payload._id;

    history.push(`/customers/${customerId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "create", "customer");
  }
};
// Edit a customer ---------------------------------------
export const startEditCustomer = (
  customerId,
  data,
  history
) => async dispatch => {
  try {
    const res = await axios.patch(`/api/customers/${customerId}`, data);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push(`/customers/${customerId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "update", "customer");
  }
};
// Delete a customer --------------------------------------
export const startDeleteCustomer = (customerId, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/customers/${customerId}`);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push("/customers/search");
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", "customer");
  }
};

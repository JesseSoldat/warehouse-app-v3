import axios from "axios";
// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading, showOverlay } from "./ui";
// types
export const CUSTOMERS_REQUESTED = "CUSTOMERS_REQUESTED";
export const CUSTOMERS_LOADED = "CUSTOMERS_LOADED";

export const CUSTOMERS_ADD_ONE = "CUSTOMERS_ADD_ONE";
export const CUSTOMERS_UPDATE_ONE = "CUSTOMERS_UPDATE_ONE";
export const CUSTOMERS_DELETE_ONE = "CUSTOMERS_DELETE_ONE";

// Get all customers -------------------------------
export const customersRequested = () => ({
  type: CUSTOMERS_REQUESTED
});

export const customersLoaded = (customerEntity, customerOrder) => ({
  type: CUSTOMERS_LOADED,
  customerEntity,
  customerOrder
});

export const startGetCustomers = () => async dispatch => {
  dispatch(customersRequested());

  try {
    const res = await axios.get("/api/customers");

    const { msg, payload, options } = res.data;

    const customerEntity = {};

    const customerOrder = [];

    payload.forEach(obj => {
      customerEntity[obj._id] = obj;
      customerOrder.push(obj._id);
    });

    dispatch(customersLoaded(customerEntity, customerOrder));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "customers");
  }
};

// Create a new customer -----------------------------
export const createCustomer = customer => ({
  type: CUSTOMERS_ADD_ONE,
  customer
});

export const startCreateCustomer = (data, history) => async dispatch => {
  dispatch(showOverlay());
  try {
    const res = await axios.post("/api/customers", data);

    const { msg, payload, options } = res.data;

    dispatch(createCustomer(payload));

    checkForMsg(msg, dispatch, options);

    const customerId = payload._id;

    history.push(`/customers/${customerId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "create", "customer");
  }
};
// Edit a customer ---------------------------------------
export const editCustomer = customer => ({
  type: CUSTOMERS_UPDATE_ONE,
  customer
});

export const startEditCustomer = (
  customerId,
  data,
  history
) => async dispatch => {
  dispatch(showOverlay());
  try {
    const res = await axios.patch(`/api/customers/${customerId}`, data);

    const { msg, options, payload } = res.data;

    dispatch(editCustomer(payload));

    checkForMsg(msg, dispatch, options);

    history.push(`/customers/${customerId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "update", "customer");
  }
};
// Delete a customer --------------------------------------
export const deleteCustomer = customer => ({
  type: CUSTOMERS_DELETE_ONE,
  customer
});

export const startDeleteCustomer = (customerId, history) => async dispatch => {
  dispatch(showOverlay());
  try {
    const res = await axios.delete(`/api/customers/${customerId}`);

    const { msg, options, payload } = res.data;

    dispatch(deleteCustomer(payload));

    checkForMsg(msg, dispatch, options);

    history.push("/customers/search");
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", "customer");
  }
};

import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
// actions
import { loading } from "./ui";
// types
export const PRODUCERS_FETCH_ALL = "PRODUCERS_FETCH_ALL";
export const PRODUCERS_FETCH_ONE = "PRODUCERS_FETCH_ONE";
export const PRODUCERS_CREATE = "PRODUCERS_CREATE";

// Get all producers ----------------------------------------
export const getProducers = producers => ({
  type: PRODUCERS_FETCH_ALL,
  producers
});

export const startGetProducers = () => async dispatch => {
  dispatch(loading(true));

  try {
    const res = await axios.get("/api/producers");

    const { msg, payload, options } = res.data;

    dispatch(getProducers(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "producers");
  }
};

// Get one producer ----------------------------------------
export const getProducer = producer => ({
  type: PRODUCERS_FETCH_ONE,
  producer
});

export const startGetProducer = producerId => async dispatch => {
  dispatch(loading(true));

  try {
    const res = await axios.get(`/api/producers/${producerId}`);

    const { msg, payload, options } = res.data;

    dispatch(getProducer(payload));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "producer");
  }
};
// Create a producer ---------------------------------------
export const startCreateProducer = (data, history) => async dispatch => {
  try {
    const res = await axios.post("/api/producers", data);

    const { msg, payload, options } = res.data;

    checkForMsg(msg, dispatch, options);

    const productId = payload._id;

    history.push(`/producers/${productId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "create", "producer");
  }
};
// Edit a producer -------------------------------------------
export const startEditProducer = (
  producerId,
  data,
  history
) => async dispatch => {
  try {
    const res = await axios.patch(`/api/producers/${producerId}`, data);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push(`/producers/${producerId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "update", "producer");
  }
};
// Delete a producer --------------------------------------
export const startDeleteProducer = (producerId, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/producers/${producerId}`);

    const { msg, options } = res.data;

    checkForMsg(msg, dispatch, options);

    history.push("/producers/search");
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", "producer");
  }
};

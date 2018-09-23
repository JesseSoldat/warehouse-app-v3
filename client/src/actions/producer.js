import axios from "axios";

// helpers
import checkForMsg from "./helpers/checkForMsg";
import axiosResponseErrorHandling from "./helpers/axiosResponseErrorHandling";
import createEntity from "./helpers/createEntity";
// types
export const PRODUCERS_REQUESTED = "PRODUCERS_REQUESTED";
export const PRODUCERS_LOADED = "PRODUCERS_LOADED";
export const PRODUCERS_ADD_ONE = "PRODUCERS_ADD_ONE";
export const PRODUCERS_UPDATE_ONE = "PRODUCERS_UPDATE_ONE";
export const PRODUCERS_DELETE_ONE = "PRODUCERS_DELETE_ONE";

// Get all producers ----------------------------------------
export const producersRequested = () => ({
  type: PRODUCERS_REQUESTED
});

export const producersLoaded = (producerEntity, producerOrder) => ({
  type: PRODUCERS_LOADED,
  producerEntity,
  producerOrder
});

export const startGetProducers = () => async dispatch => {
  dispatch(producersRequested());

  try {
    const res = await axios.get("/api/producers");

    const { msg, payload, options } = res.data;

    const { entity: producerEntity, order: producerOrder } = createEntity(
      payload
    );

    dispatch(producersLoaded(producerEntity, producerOrder));

    checkForMsg(msg, dispatch, options);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "fetch", "producers");
  }
};

// Create a producer ---------------------------------------
export const createProducer = producer => ({
  type: PRODUCERS_ADD_ONE,
  producer
});

export const startCreateProducer = (data, history) => async dispatch => {
  try {
    const res = await axios.post("/api/producers", data);

    const { msg, payload, options } = res.data;

    dispatch(createProducer(payload));

    checkForMsg(msg, dispatch, options);

    const productId = payload._id;

    history.push(`/producers/${productId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "create", "producer");
  }
};
// Edit a producer -------------------------------------------
export const editProducer = producer => ({
  type: PRODUCERS_UPDATE_ONE,
  producer
});

export const startEditProducer = (
  producerId,
  data,
  history
) => async dispatch => {
  try {
    const res = await axios.patch(`/api/producers/${producerId}`, data);

    const { msg, options, payload } = res.data;

    dispatch(editProducer(payload));

    checkForMsg(msg, dispatch, options);

    history.push(`/producers/${producerId}`);
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "update", "producer");
  }
};
// Delete a producer --------------------------------------
export const deleteProducer = producer => ({
  type: PRODUCERS_DELETE_ONE,
  producer
});

export const startDeleteProducer = (producerId, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/producers/${producerId}`);

    const { msg, options, payload } = res.data;

    dispatch(deleteProducer(payload));

    checkForMsg(msg, dispatch, options);

    history.push("/producers/search");
  } catch (err) {
    axiosResponseErrorHandling(err, dispatch, "delete", "producer");
  }
};

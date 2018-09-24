import {
  BOXES_RESET,
  BOXES_LOADED,
  BOX_LOADED,
  BOX_CREATE_ONE,
  BOX_CREATE_ONE_LINK,
  BOX_UPDATE_ONE,
  BOX_DELETE_ONE,
  BOX_DELETE_ONE_WITH_LOCATION
} from "../actions/box";
import { LINK_BOX_TO_SHELFSPOT, LINK_PRODUCT_TO_BOX } from "../actions/link";
import { UNLINK_BOX_FROM_SHELFSPOT } from "../actions/unlink";

const initialQuery = {
  page: 1,
  skip: 0,
  limit: 20,
  count: 0, // can be filtered
  totalCount: 0, // all of the boxes
  value: null,
  searchType: "string"
};

const initialState = {
  boxes: [],
  box: null,
  query: initialQuery
};

export default (state = initialState, action) => {
  const { type, box, boxes, update, query } = action;

  switch (type) {
    case BOXES_RESET:
      return {
        boxes: [],
        box: null,
        query: initialQuery
      };

    // --------------------- GET BOXES ----------------------
    case BOXES_LOADED:
      return {
        ...state,
        boxes,
        box: null,
        query
      };
    // ----------------------- GET BOX ----------------------
    case BOX_LOADED:
      return {
        ...state,
        box
      };
    // ----------------------- CREATE ----------------------
    case BOX_CREATE_ONE:
      return {
        ...state,
        boxes: [],
        box
      };

    case BOX_CREATE_ONE_LINK:
      // API update = { shelfSpot, box }
      // BOX is now fetched from RACK
      return {
        ...state,
        boxes: [],
        box
      };
    // ----------------------- UPDATE ----------------------
    case BOX_UPDATE_ONE:
      return {
        ...state,
        boxes: [],
        box: update.box
      };
    // ------------------- DELETE -----------------------------
    case BOX_DELETE_ONE:
    case BOX_DELETE_ONE_WITH_LOCATION:
      return {
        ...state,
        boxes: [],
        box: null
      };

    // ---------------- UN-LINKING & LINKING ----------------
    // API update = { box }
    case UNLINK_BOX_FROM_SHELFSPOT:
    case LINK_BOX_TO_SHELFSPOT:
    case LINK_PRODUCT_TO_BOX:
      return {
        ...state,
        boxes: [],
        box: update.box
      };

    default:
      return { ...state };
  }
};

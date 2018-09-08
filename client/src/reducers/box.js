import {
  BOXES_RESET,
  BOXES_REQUESTED,
  BOXES_LOADED,
  BOX_REQUESTED,
  BOX_LOADED,
  BOX_CREATE_ONE,
  BOX_UPDATE_ONE,
  BOX_DELETE_ONE
} from "../actions/box";
import { LINK_BOX_TO_SHELFSPOT, LINK_PRODUCT_TO_BOX } from "../actions/link";
import { UNLINK_BOX_FROM_SHELFSPOT } from "../actions/unlink";

const initialState = {
  boxes: [],
  boxesRequsted: false,
  boxesLoaded: false,
  box: null,
  boxRequsted: false,
  boxLoaded: false,
  query: {
    page: 1,
    skip: 0,
    limit: 20,
    count: 0, // can be filtered
    totalCount: 0, // all of the boxes
    value: null,
    searchType: "string"
  }
};

export default (state = initialState, action) => {
  const { type, box, boxes, update, query } = action;
  switch (type) {
    case BOXES_RESET:
      return {
        ...state,
        boxes: [],
        boxesRequsted: false,
        boxesLoaded: false,
        box: null,
        boxRequsted: false,
        boxLoaded: false,
        query: {
          page: 1,
          skip: 0,
          limit: 20,
          count: 0, // can be filtered
          totalCount: 0, // all of the boxes
          value: null,
          searchType: "string"
        }
      };
    case BOXES_REQUESTED:
      return {
        ...state,
        boxesRequsted: true,
        boxesLoaded: false
      };

    case BOXES_LOADED:
      // console.log("BOXES_LOADED", boxes[1]);
      return {
        ...state,
        boxes,
        boxesRequsted: false,
        boxesLoaded: true,
        query
      };

    case BOX_REQUESTED:
      return {
        ...state,
        boxRequsted: true,
        boxLoaded: false
      };

    case BOX_LOADED:
      // console.log("BOX_LOADED", box);
      return {
        ...state,
        box,
        boxRequsted: false,
        boxLoaded: true
      };

    case BOX_CREATE_ONE:
      return {
        ...state,
        boxes: [],
        box
      };

    case BOX_UPDATE_ONE:
      return {
        ...state,
        boxes: [],
        box
      };

    case BOX_DELETE_ONE:
      // Api update = { boxId }
      return {
        ...state,
        boxes: [],
        box: null
      };

    // -----------------------UN-LINKING -------------------------
    case UNLINK_BOX_FROM_SHELFSPOT:
      console.log("UNLINK_BOX_FROM_SHELFSPOT", update);
    // API update = { box }
    // ------------------------ LINKING ---------------------------
    case LINK_BOX_TO_SHELFSPOT:
    // console.log("LINK_BOX_TO_SHELFSPOT", update);
    case LINK_PRODUCT_TO_BOX:
      // console.log("LINK_PRODUCT_TO_BOX", update);
      // API update = { box }
      return {
        ...state,
        boxes: [],
        box: update.box
      };

    default:
      return { ...state };
  }
};

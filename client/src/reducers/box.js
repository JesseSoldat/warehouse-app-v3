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

    default:
      return { ...state };
  }
};

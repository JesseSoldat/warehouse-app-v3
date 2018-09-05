import {
  BOXES_REQUESTED,
  BOXES_LOADED,
  BOX_REQUESTED,
  BOX_LOADED,
  BOX_DELETE_ONE
} from "../actions/box";

const initialState = {
  boxes: [],
  boxesRequsted: false,
  boxesLoaded: false,
  box: null,
  boxRequsted: false,
  boxLoaded: false,
  query: {}
};

export default (state = initialState, action) => {
  const { type, box, boxes, query } = action;
  switch (type) {
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
        boxesLoaded: true
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

    case BOX_DELETE_ONE:
      return {
        ...state,
        box: null,
        boxRequsted: false,
        boxLoaded: false
      };

    default:
      return { ...state };
  }
};

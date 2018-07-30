import { PRODUCERS_FETCH_ALL, PRODUCERS_FETCH_ONE } from "../actions/producer";
const initialState = {
  producers: [],
  producer: null
};

export default (state = initialState, action) => {
  const { type, producers, producer } = action;

  switch (type) {
    case PRODUCERS_FETCH_ALL:
      // console.log("PRODUCERS_FETCH_ALL", producers);
      return { ...state, producers };

    case PRODUCERS_FETCH_ONE:
      // console.log('PRODUCERS_FETCH_ONE', producer);
      return { ...state, producer };

    default:
      return { ...state };
  }
};

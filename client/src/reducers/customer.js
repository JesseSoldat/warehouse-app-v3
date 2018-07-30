import { CUSTOMERS_FETCH_ALL, CUSTOMERS_FETCH_ONE } from "../actions/customer";
const initialState = {
  customers: [],
  customer: null
};

export default (state = initialState, action) => {
  const { type, customers, customer } = action;

  switch (type) {
    case CUSTOMERS_FETCH_ALL:
      // console.log("CUSTOMERS_FETCH_ALL", customers);
      return { ...state, customers };

    case CUSTOMERS_FETCH_ONE:
      return { ...state, customer };

    default:
      return { ...state };
  }
};

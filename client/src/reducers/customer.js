import {
  CUSTOMERS_FETCH_ALL,
  CUSTOMERS_FETCH_ONE,
  CUSTOMERS_RESET
} from "../actions/customer";
const initialState = {
  customers: [],
  customer: null,
  customerEntity: null,
  customerOrder: []
};

export default (state = initialState, action) => {
  const { type, customer, customerEntity, customerOrder } = action;

  switch (type) {
    case CUSTOMERS_FETCH_ALL:
      const customers = [];
      customerOrder.forEach(id => customers.push(customerEntity[id]));

      return {
        ...state,
        customers,
        customerEntity,
        customerOrder
      };

    case CUSTOMERS_FETCH_ONE:
      return { ...state, customer };

    case CUSTOMERS_RESET:
      return { ...initialState };

    default:
      return { ...state };
  }
};

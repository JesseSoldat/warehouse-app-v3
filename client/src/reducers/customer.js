import {
  CUSTOMERS_FETCH_ALL,
  CUSTOMERS_FETCH_ONE,
  CUSTOMERS_ADD_ONE,
  CUSTOMERS_RESET
} from "../actions/customer";
const initialState = {
  customerEntity: null,
  customerOrder: [],
  customers: [],
  customer: null
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

    case CUSTOMERS_ADD_ONE:
      // new customer
      const id = customer._id;

      // do not mutate original state
      const updatedEntity = { ...state.customerEntity };
      const newSortOrder = [...state.customerOrder];
      const newCustomers = [...state.customers];

      // check if customerEntity has been fetched and stored
      if (state.customerEntity) {
        updatedEntity[id] = customer;

        // customers is sorted from newest first
        newSortOrder.unshift(id);
        newCustomers.unshift(customer);
      }

      return {
        ...state,
        customerEntity: updatedEntity,
        customerOrder: newSortOrder,
        customers: newCustomers
      };

    case CUSTOMERS_RESET:
      return { ...initialState };

    default:
      return { ...state };
  }
};

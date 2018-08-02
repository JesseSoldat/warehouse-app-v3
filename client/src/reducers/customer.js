import {
  CUSTOMERS_REQUESTED,
  CUSTOMERS_LOADED,
  CUSTOMERS_ADD_ONE,
  CUSTOMERS_UPDATE_ONE,
  CUSTOMERS_DELETE_ONE
} from "../actions/customer";

const initialState = {
  customerEntity: null,
  customerOrder: [],
  customers: [],
  customersRequest: false,
  customersLoaded: false
};

export default (state = initialState, action) => {
  const { type, customer, customerEntity, customerOrder } = action;

  switch (type) {
    case CUSTOMERS_REQUESTED:
      return {
        ...state,
        customersLoaded: false,
        customersRequest: true
      };

    case CUSTOMERS_LOADED:
      const customers = [];
      customerOrder.forEach(id => customers.push(customerEntity[id]));

      return {
        ...state,
        customers,
        customerEntity,
        customerOrder,
        customersLoaded: true,
        customersRequest: false
      };

    case CUSTOMERS_ADD_ONE:
      const newId = customer._id;

      // do not mutate original state
      const newEntity = { ...state.customerEntity };
      const newSortOrder = [...state.customerOrder];
      const newCustomers = [...state.customers];

      // check if customerEntity has been fetched and stored
      if (newEntity) {
        newEntity[newId] = customer;

        // customers is sorted from newest first
        newSortOrder.unshift(newId);
        newCustomers.unshift(customer);
      }

      return {
        ...state,
        customerEntity: newEntity,
        customerOrder: newSortOrder,
        customers: newCustomers
      };

    case CUSTOMERS_UPDATE_ONE:
      const updateId = customer._id;

      // do not mutate original state
      const updatedEntity = { ...state.customerEntity };
      const updatedCustomers = [...state.customers];

      // check if customerEntity has been fetched and stored
      if (updatedEntity) {
        updatedEntity[updateId] = customer;

        const updateIndex = updatedCustomers.findIndex(
          obj => obj._id === updateId
        );

        updatedCustomers.splice(updateIndex, 1, customer);
      }
      return {
        ...state,
        customerEntity: updatedEntity,
        customers: updatedCustomers
      };

    case CUSTOMERS_DELETE_ONE:
      const deleteId = customer._id;

      // do not mutate original state
      const deleteEntity = { ...state.customerEntity };
      const deleteSortOrder = [...state.customerOrder];
      const deleteCustomers = [...state.customers];

      // check if customerEntity has been fetched and stored
      if (deleteEntity) {
        // remove the prop from the entity
        delete deleteEntity[deleteId];

        const deleteIndex = deleteSortOrder.findIndex(id => id === deleteId);

        // remove the item from both arrays
        deleteSortOrder.splice(deleteIndex, 1);
        deleteCustomers.splice(deleteIndex, 1);
      }

      return {
        ...state,
        customerEntity: deleteEntity,
        customerOrder: deleteSortOrder,
        customers: deleteCustomers
      };

    default:
      return { ...state };
  }
};

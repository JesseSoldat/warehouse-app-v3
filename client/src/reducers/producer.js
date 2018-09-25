import {
  PRODUCERS_REQUESTED,
  PRODUCERS_LOADED,
  PRODUCERS_ADD_ONE,
  PRODUCERS_UPDATE_ONE,
  PRODUCERS_DELETE_ONE
} from "../actions/producer";

const initialState = {
  producerEntity: null,
  producerOrder: null,
  producers: []
};

export default (state = initialState, action) => {
  const { type, producer, producerEntity, producerOrder } = action;

  switch (type) {
    case PRODUCERS_REQUESTED:
      return { ...state };

    case PRODUCERS_LOADED:
      const producers = [];

      producerOrder.forEach(id => producers.push(producerEntity[id]));

      return { ...state, producers, producerEntity, producerOrder };

    case PRODUCERS_ADD_ONE:
      const newId = producer._id;

      // do not mutate original state
      const newEntity = { ...state.producerEntity };
      const newSortOrder = [...state.producerOrder];
      const newProducers = [...state.producers];

      // check if producerEntity has been fetched and stored
      if (newEntity) {
        newEntity[newId] = producer;

        // producers is sorted from newest first
        newSortOrder.unshift(newId);
        newProducers.unshift(producer);
      }

      return {
        ...state,
        producerEntity: newEntity,
        producerOrder: newSortOrder,
        producers: newProducers
      };

    case PRODUCERS_UPDATE_ONE:
      const updateId = producer._id;

      // do not mutate original state
      const updatedEntity = { ...state.producerEntity };
      const updatedProducers = [...state.producers];

      // check if producerEntity has been fetched and stored
      if (updatedEntity) {
        updatedEntity[updateId] = producer;

        const updateIndex = updatedProducers.findIndex(
          obj => obj._id === updateId
        );

        updatedProducers.splice(updateIndex, 1, producer);
      }
      return {
        ...state,
        producerEntity: updatedEntity,
        producers: updatedProducers
      };

    case PRODUCERS_DELETE_ONE:
      const deleteId = producer._id;

      // do not mutate original state
      const deleteEntity = { ...state.producerEntity };
      const deleteSortOrder = [...state.producerOrder];
      const deleteProducers = [...state.producers];

      // check if producerEntity has been fetched and stored
      if (deleteEntity) {
        // remove the prop from the entity
        delete deleteEntity[deleteId];

        const deleteIndex = deleteSortOrder.findIndex(id => id === deleteId);

        // remove the item from both arrays
        deleteSortOrder.splice(deleteIndex, 1);
        deleteProducers.splice(deleteIndex, 1);
      }

      return {
        ...state,
        producerEntity: deleteEntity,
        producerOrder: deleteSortOrder,
        producers: deleteProducers
      };

    default:
      return { ...state };
  }
};

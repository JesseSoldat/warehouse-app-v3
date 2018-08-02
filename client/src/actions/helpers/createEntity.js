const createEntity = payload => {
  // producerEntity = { _id: {PRODUCER} }
  const entity = {};
  // keep the obj in order based on mongo sorted the data
  const order = [];

  payload.forEach(obj => {
    entity[obj._id] = obj;
    order.push(obj._id);
  });

  return { entity, order };
};

export default createEntity;

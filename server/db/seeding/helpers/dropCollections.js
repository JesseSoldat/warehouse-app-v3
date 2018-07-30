const dropCollection = async collection => {
  await collection.remove();
};

const dropCollections = collections => {
  try {
    collections.forEach(collection => dropCollection(collection));
  } catch (err) {
    console.log(
      `Error: could not drop the ${collection} collection while seeding the database.`
    );
  }
};

module.exports = dropCollections;

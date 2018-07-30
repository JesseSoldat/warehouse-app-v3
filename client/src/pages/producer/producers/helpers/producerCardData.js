const producerCardData = producers => {
  return producers.map(producer => ({
    id: producer._id,
    title: producer.producerName,
    linkText1: "View",
    linkText2: "Edit",
    link1: `/producers/${producer._id}`,
    link2: `/producers/edit/${producer._id}`
  }));
};

export default producerCardData;

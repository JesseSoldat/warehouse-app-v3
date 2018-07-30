const customerCardData = customers => {
  return customers.map(customer => ({
    id: customer._id,
    title: customer.customerName,
    linkText1: "View",
    linkText2: "Edit",
    link1: `/customers/${customer._id}`,
    link2: `/customers/edit/${customer._id}`
  }));
};

export default customerCardData;

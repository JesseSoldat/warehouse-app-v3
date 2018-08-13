const productCardData = (products, cb1, cb2) => {
  return products.map(product => {
    const { productPictures, packagingPictures } = product;
    const pictures = [...productPictures, ...packagingPictures];

    return {
      id: product._id,
      title: product.productName,
      picture: pictures.length > 0 ? pictures[0] : null,
      cb1,
      cb2,
      cb1Text: "View",
      cb2Text: "Edit"
    };
  });
};

export default productCardData;

const productCardData = products => {
  return products.map(product => {
    const { productPictures, packagingPictures } = product;
    const pictures = [...productPictures, ...packagingPictures];

    return {
      id: product._id,
      title: product.productName,
      picture: pictures.length > 0 ? pictures[0] : null,
      linkText1: "View",
      linkText2: "Edit",
      link1: `/products/${product._id}`,
      link2: `/products/edit/${product._id}`
    };
  });
};

export default productCardData;

// single card
const productCardData = product => {
  const { productPictures, packagingPictures } = product;
  const pictures = [...productPictures, ...packagingPictures];

  return {
    id: product._id,
    title: product.productName,
    picture: pictures.length > 0 ? pictures[0] : null
  };
};

export default productCardData;

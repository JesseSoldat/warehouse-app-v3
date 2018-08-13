import React from "react";

// common components
import Spinner from "../../../components/Spinner";
import CardList from "../../../components/CardList";
// helpers
import productCardData from "../helpers/productCardData";

const LinkProductToBox = ({
  loading,
  orphans = [],
  handleLinkProductToBox,
  history
}) => {
  const viewDetails = productId => {
    history.push(`/products/${productId}`);
  };

  const link = (productId, e) => {
    e.preventDefault();
    handleLinkProductToBox(productId);
  };

  let content;
  if (loading) {
    content = <Spinner />;
  } else if (orphans.length > 0) {
    const cardData = productCardData(orphans, viewDetails, link);
    content = <CardList data={cardData} />;
  } else {
    content = <h1>All products are currently stored</h1>;
  }
  return <div>{content} </div>;
};

export default LinkProductToBox;

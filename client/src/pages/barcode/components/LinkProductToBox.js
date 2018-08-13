import React from "react";

// common components
import Spinner from "../../../components/Spinner";
import CardList from "../../../components/CardList";
// helpers
import productCardData from "../helpers/productCardData";

const LinkProductToBox = ({ loading, orphans = [], handleLink, history }) => {
  const viewDetails = productId => {
    console.log("productId", productId);
    history.push(`/products/${productId}`);
  };

  let content;
  if (loading) {
    content = <Spinner />;
  } else if (orphans.length > 0) {
    const cardData = productCardData(orphans, viewDetails, handleLink);
    content = <CardList data={cardData} />;
  } else {
    content = <h1>All products are currently stored</h1>;
  }
  return <div>{content} </div>;
};

export default LinkProductToBox;

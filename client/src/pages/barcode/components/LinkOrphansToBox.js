import React from "react";
import { Link } from "react-router-dom";

// common components
import Spinner from "../../../components/Spinner";
import CardList from "../../../components/cards/CardList";
// helpers
import productCardData from "../helpers/productCardData";

const LinkOrphansToBox = ({
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

  let content, noProducts;

  if (loading) {
    content = <Spinner />;
  } else if (orphans.length > 0) {
    const cardData = productCardData(orphans, viewDetails, link);
    content = <CardList data={cardData} />;
  } else {
    noProducts = (
      <div className="row">
        <div className="col-12">
          <h3 className="text-center pt-4 mt-5 pb-2">
            All products are currently stored
          </h3>
          <Link to={`/products/create`}>
            <h4 className="text-center">Create a Product</h4>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-4">
      {noProducts}
      {content}
    </div>
  );
};

export default LinkOrphansToBox;

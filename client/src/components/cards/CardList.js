import React from "react";

// components
import ImageCard from "./ImageCard";
import Card from "./Card";

const CardList = ({
  data,
  flexType = "justify-content-around",
  cardType = "image"
}) => (
  <div className="row">
    <div className={`col-12 mx-auto d-flex ${flexType} flex-wrap`}>
      {data.length >= 1 &&
        data.map(
          d =>
            cardType === "image" ? (
              <ImageCard key={d.id} data={d} />
            ) : (
              <Card key={d.id} data={d} />
            )
        )}
    </div>
  </div>
);

export default CardList;

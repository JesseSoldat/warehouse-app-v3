import React from "react";

// components
import Card from "./Card";

const CardList = ({ data, flexType = "justify-content-around" }) => (
  <div className="row">
    <div className={`col-12 mx-auto d-flex ${flexType} flex-wrap`}>
      {data.length >= 1 && data.map(d => <Card key={d.id} data={d} />)}
    </div>
  </div>
);

export default CardList;

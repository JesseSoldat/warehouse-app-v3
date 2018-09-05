import React from "react";

// common components
import Heading from "../../components/Heading";

const Welcome = () => (
  <div className="welcomepage">
    <div className="dark-overlay text-light">
      <div className="container">
        <div style={{ height: "50px" }} />
        <Heading title="Warehouse App" />
      </div>
    </div>
  </div>
);

export default Welcome;

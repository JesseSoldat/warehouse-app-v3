import React from "react";

// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
import BasicCard from "../../components/BasicCard";

const Dashboard = () => {
  return (
    <div className="container">
      <Message />
      <Heading title="Dashboard" />
      <div className="row">
        <div className="col-12 d-flex flex-wrap justify-content-between my-4">
          <BasicCard
            title="Search & Edit Products"
            subtitle="Search and edit products here"
            link="/products/search"
            linkText="Search!"
          />

          <BasicCard
            title="Create Product"
            subtitle="Get starting by adding some products"
            link="/products/create"
            linkText="Create Product!"
          />

          <BasicCard
            title="Maintenance"
            subtitle="Create and edit Storage places here"
            link="/storages"
            linkText="Go!"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

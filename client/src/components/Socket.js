import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

// actions
import { serverMsg } from "../actions/ui";

// helpers
import buildClientMsg from "../actions/helpers/buildClientMsg";

const port = process.env.PORT || 5000;

let socket;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  socket = io("http://localhost:5000");
} else {
  // production code
  const prodUrl = `jlab-warehouse-app.herokuapp.com:${port}`;
  console.log("Production:", prodUrl);

  socket = io(prodUrl);
}

const Socket = ({ userId, serverMsg }) => {
  socket.on("update", data => {
    const { msg, senderId, timestamp } = data;

    if (msg === "database error") {
      console.log("Database Error issued at:", timestamp);
      const msg = buildClientMsg({
        info: "Cloud Database is currently offline.",
        color: "red"
      });

      serverMsg({ msg, from: "socketDatabaseOffline" });
    }

    if (senderId === userId) return;

    switch (msg) {
      case "product":
        console.log("product updated", timestamp);

        break;

      case "customer":
        console.log("customer updated", timestamp);

        break;

      case "producer":
        console.log("producer updated", timestamp);

        break;

      case "storage":
        console.log("storage updated", timestamp);

        break;

      default:
        break;
    }
  });

  return <div />;
};

const mapStateToProps = state => ({
  userId: state.auth._id,
  product: state.product,
  customer: state.customer,
  producer: state.producer,
  storage: state.storage
});

export default connect(
  mapStateToProps,
  { serverMsg }
)(Socket);

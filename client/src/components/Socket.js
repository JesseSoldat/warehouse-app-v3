import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Socket = ({ userId }) => {
  socket.on("update", data => {
    const { msg, senderId, timestamp } = data;

    if (senderId === userId) {
      console.log("senderId matches userId", senderId);
      // return;
    }

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
  {}
)(Socket);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// Custom Components
import AuthForm from "./components/AuthForm";
// actions
import { startRegister } from "../../actions/auth";
import { showOverlay } from "../../actions/ui";

class Register extends Component {
  // Events and Cbs ---------------------------
  handleRegister = (username, email, password) => {
    // Api Call
    this.props.showOverlay({ from: "registerShowOverlay" });
    this.props.startRegister({ username, email, password }, this.props.history);
  };

  // Render -------------------------------------
  render() {
    return (
      <div className="container my-3">
        <Message />
        <Heading title="register" />
        <AuthForm parent="register" handleRegister={this.handleRegister} />
        <div style={{ height: "100px" }} />
      </div>
    );
  }
}

export default connect(
  null,
  {
    showOverlay,
    startRegister
  }
)(withRouter(Register));

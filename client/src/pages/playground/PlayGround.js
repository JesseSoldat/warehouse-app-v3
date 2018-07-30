import React, { Component } from "react";
import { connect } from "react-redux";
// import Select from "react-select";

// components
// utils
import clearUiMsg from "../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../actions/router";
import { serverMsg } from "../../actions/ui";

// used to test concepts
class PlayGround extends Component {
  componentDidMount() {
    console.log("mounted");
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/admin/playGround");
  }

  render() {
    return <div className="container" />;
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg,
  options: ui.options
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute }
)(PlayGround);

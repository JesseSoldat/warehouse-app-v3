import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// utils
import clearUiMsg from "../utils/clearUiMsg";
// actions
import { changeRoute } from "../actions/router";
import { serverMsg } from "../actions/ui";

class RouteListener extends Component {
  state = {};

  componentWillMount() {
    const { changeRoute, msg, serverMsg, history, match } = this.props;

    // the user clicks on any links in the app
    this.unlisten = history.listen(location => {
      // console.log("#1 FROM", match.path);
      // console.log("#2 TO", location.pathname);
      // clearUiMsg(msg, serverMsg);
      // changeRoute(match.path, location.pathname);
    });

    // the user clicks on the back btn
    window.onpopstate = () => {
      // console.log("#2 TO", window.location.pathname);
    };
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg
});

export default connect(
  mapStateToProps,
  { changeRoute, serverMsg }
)(withRouter(RouteListener));

import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class RouteChanged extends Component {
  componentDidMount() {
    let prevLocation = {};
    this.props.history.listen(location => {
      const pathChanged = prevLocation.pathname !== location.pathname;

      if (pathChanged) window.scrollTo(0, 0);

      prevLocation = location;
    });
  }
  render() {
    return <div />;
  }
}

export default withRouter(RouteChanged);

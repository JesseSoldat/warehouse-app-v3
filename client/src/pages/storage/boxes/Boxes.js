import React, { Component } from "react";
import { connect } from "react-redux";
// actions
import { startGetBoxes } from "../../../actions/box";

class Boxes extends Component {
  componentDidMount() {
    this.getApiData();
  }

  getApiData = () => {
    this.props.startGetBoxes();
  };
  render() {
    const { boxes } = this.props;

    if (boxes.length) console.log(boxes);

    return (
      <div>
        <h1>Boxes</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ box }) => ({
  boxes: box.boxes
});

export default connect(
  mapStateToProps,
  { startGetBoxes }
)(Boxes);

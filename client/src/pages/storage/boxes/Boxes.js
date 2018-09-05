import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import CardList from "../../../components/CardList";
// import Paginator from "./components/Paginator";
// import SearchBar from "./components/SearchBar";
// helpers
import boxCardData from "./helpers/boxCardData";
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
    const { loading, boxes, query } = this.props;
    let content;

    // if (boxes.length) console.log(boxes);

    if (loading) {
      content = <Spinner />;
    } else if (!boxes || !boxes.length) {
      content = (
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="mt-3">No boxes found</h3>
          </div>
        </div>
      );
    } else {
      content = <CardList data={boxCardData(boxes)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getApiData} />
        <Heading title="Boxes" />
        {/* <Paginator query={query} cb1={this.getProducts} />
      <SearchBar
        // option
        searchOption={this.state.searchOption}
        // value
        value={this.state.value}
        value2={this.state.value2}
        disableValue2={this.state.disableValue2}
        valueErr={this.state.valueErr}
        // type
        searchType={this.state.searchType}
        // CB
        onChangeSearchOption={this.onChangeSearchOption}
        onChangeSearchValue={this.onChangeSearchValue}
        onChangeSearchValue2={this.onChangeSearchValue2}
        handleUseValue2={this.handleUseValue2}
        onSearchProduct={this.onSearchProduct}
        onResetFilter={this.onResetFilter}
      /> */}
        <div style={{ height: "15px" }} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, box }) => ({
  loading: ui.loading,
  boxes: box.boxes
});

export default connect(
  mapStateToProps,
  { startGetBoxes }
)(Boxes);

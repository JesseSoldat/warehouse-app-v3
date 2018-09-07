import React, { Component } from "react";
import { connect } from "react-redux";
// common components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import CardList from "../../../components/cards/CardList";
import Paginator from "../../../components/Paginator";
// custom components
import SearchBar from "./components/SearchBar";
// helpers
import boxCardData from "./helpers/boxCardData";
import searchBarFields from "./helpers/searchBarFields";
// actions
import { startGetBoxes } from "../../../actions/box";

class Boxes extends Component {
  state = {
    searchOption: "boxLabel",
    value: "",
    valueErr: "",
    searchType: "string",
    orphanSearch: false
  };

  // lifecycles ---------------------------------------------
  componentDidMount() {
    this.getApiData();
  }
  // api calls ----------------------------------------------
  getApiData = () => {
    this.props.startGetBoxes(this.props.query);
  };
  //-------------------------- search bar ---------------------------------------
  // Select Value Changed CB
  onChangeSearchOption = e => {
    const searchOption = e.target.value;
    // string || orphans
    let searchType;
    // value of first input
    let value = "";
    // orphanSearch (products without a location)
    let orphanSearch = false;

    if (searchOption === "boxLabel") {
      searchType = "string";
    } else {
      searchType = "orphans";
      orphanSearch = true;
    }

    const newState = {
      searchType,
      searchOption,
      value,
      orphanSearch
    };

    // every time we change the select options
    // we reset the intial state using specific
    // values for the UI input type
    this.setState(() => ({ ...newState }));
  };

  // Text Value Changed CB
  onChangeSearchValue = e =>
    this.setState({ value: e.target.value, valueErr: "" });

  // Reset form and refetch all products -----------------
  onResetFilter = async e => {
    // set state back to initial settings
    await this.setState(() => ({
      searchType: "string",
      searchOption: "boxLabel",
      value: "",
      valueErr: "",
      orphanSearch: false
    }));

    // set intial query settings
    const query = {
      page: 1,
      skip: 0,
      limit: 20
    };
    // fetch all of the products
    this.props.startGetBoxes(query);
  };

  // SearchBtn CB ----------------------------------------
  onSearch = e => {
    const { value, searchOption, orphanSearch } = this.state;
    // search for boxes without storage locations
    // orphan search does not need a value
    if (!value && !orphanSearch) {
      return this.setState({ valueErr: "This field can not be empty." });
    }

    const { query } = this.props;
    query["page"] = 1;
    query["skip"] = 0;
    query["searchOption"] = searchOption;
    query["value"] = value;
    this.props.startGetBoxes(query);
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
        <Paginator
          label1="Box"
          label2="Boxes"
          query={query}
          getApiData={this.getApiData}
        />
        <SearchBar
          searchBarFields={searchBarFields}
          searchOption={this.state.searchOption}
          value={this.state.value}
          searchType={this.state.searchType}
          valueErr={this.state.valueErr}
          // cb ------------------------------------
          onChangeSearchOption={this.onChangeSearchOption}
          onChangeSearchValue={this.onChangeSearchValue}
          onSearch={this.onSearch}
          onResetFilter={this.onResetFilter}
        />
        <div style={{ height: "15px" }} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, box }) => ({
  loading: ui.loading,
  boxes: box.boxes,
  query: box.query
});

export default connect(
  mapStateToProps,
  { startGetBoxes }
)(Boxes);

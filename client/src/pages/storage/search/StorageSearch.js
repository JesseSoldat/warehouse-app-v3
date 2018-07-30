import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// common components
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import Spinner from "../../../components/Spinner";
// custom components
import SearchInputs from "./components/SearchInputs";
// actions
import { searchStorages, startSearchStorages } from "../../../actions/storage";
// utils
import capitalizeFirstLetter from "../../../utils/stringManipulation/capitalizeFirstLetter";

class StorageSearch extends Component {
  state = {
    selection: "storage",
    searchText: "",
    searchTextErr: null
  };

  // lifecycles ----------------------------
  componentWillUnmount() {
    this.props.searchStorages([], null);
  }

  // api calls -----------------------------
  onSearch = () => {
    const { selection, searchText } = this.state;
    const { startSearchStorages, history } = this.props;

    if (searchText === "") {
      const error = "Please fill in the item label";
      this.setState({ searchTextErr: error });
      return;
    }
    startSearchStorages(selection, `${selection}Label`, searchText, history);
  };

  // events -------------------------------
  onSelect = ({ target: { value } }) => {
    this.setState({ selection: value });
  };

  onInput = ({ target: { value } }) => {
    this.setState({ searchText: value, searchTextErr: null });
  };

  render() {
    const { loading, search, storageType } = this.props;

    const searchOptions = {
      Storage: "storage",
      Rack: "rack",
      Shelf: "shelf",
      ShelfSpot: "shelfSpot",
      Box: "box"
    };

    let content;
    const length = search.length;

    if (loading) {
      content = <Spinner />;
    } else if (!loading && length === 0) {
      content = "No Results Found";
    } else if (length > 0) {
      content = `Found ${length} results`;

      console.log(search);

      const label = storageType + "Label";
      content = (
        <ul className="list-group list-group-flush">
          {search.map((item, i) => (
            <li key={i} className="list-group-item">
              <Link to={`/storages/${item._id}?type=${storageType}`}>
                {capitalizeFirstLetter(storageType)} {item[label]}
              </Link>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="container">
        <Message />
        <Heading title="Search Storage" />
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 mx-auto">
            <SearchInputs
              searchOptions={searchOptions}
              selection={this.state.selection}
              searchText={this.state.searchText}
              searchTextErr={this.state.searchTextErr}
              onSelect={this.onSelect}
              onInput={this.onInput}
              onSearch={this.onSearch}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 mx-auto">
            <div className="mt-4 pl-4">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ storage, ui }) => ({
  loading: ui.loading,
  search: storage.search,
  storageType: storage.storageType
});

export default connect(
  mapStateToProps,
  { searchStorages, startSearchStorages }
)(withRouter(StorageSearch));

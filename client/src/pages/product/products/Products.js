import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import CardList from "../../../components/CardList";
import Paginator from "./components/Paginator";
import SearchBar from "./components/SearchBar";
// helpers
import productCardData from "./helpers/productCardData";
import createGetProductsQuery from "./helpers/createGetProductsQuery";
import onSelectBuildNewState from "./helpers/onSelectBuildNewState";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startGetProducts, resetProducts } from "../../../actions/product";

class Products extends Component {
  state = {
    searchOption: "productName",
    valueErr: "",
    value: "",
    value2: "",
    disableValue2: true,
    searchType: "string",
    orphanSearch: false
  };

  // lifecycles -------------------------------------
  componentDidMount() {
    const { query } = this.props;
    // fetch the products using inital  query params
    // stored in product reducer
    this.getProducts(query);
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute, resetProducts } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/products/search");
    // clear reducer query state
    resetProducts();
  }

  // api calls ----------------------------------
  getProducts = query => {
    // query changes based on where it is called from
    const { startGetProducts } = this.props;

    // take current query and update if with state values
    const updatedQuery = createGetProductsQuery(query, this.state);

    // send query to the server
    startGetProducts(updatedQuery);
  };

  // UI Events--------------------------------------------
  // SearchBar CB --------------------------------------
  onChangeSearchOption = e => {
    const newState = onSelectBuildNewState(e.target.value);

    // every time we change the select options
    // we reset the intial state using specific
    // values for the UI input type
    this.setState(() => ({
      ...newState
    }));
  };

  // Value Changed CB ----------------------------------
  onChangeSearchValue = e => {
    this.setState({ value: e.target.value, valueErr: "" });
  };

  onChangeSearchValue2 = e => {
    this.setState({ value2: e.target.value });
  };

  // Check Box CB - should use second input? ----------
  handleUseValue2 = e => {
    const { disableValue2 } = this.state;
    this.setState({ disableValue2: !disableValue2 });
  };

  // Date Changed CB -------------------------------------
  handleDateChange = e => {
    this.setState({ value: e.startOf("day"), valueErr: "" });
  };

  handleDateChange2 = e => {
    this.setState({ value2: e.endOf("day") });
  };

  // SearchBtn CB ----------------------------------------
  onSearchProduct = e => {
    const { value, orphanSearch } = this.state;
    // search for products without storage locations
    // orphan search does not need a value
    if (!value && !orphanSearch) {
      this.setState({ valueErr: "This field can not be empty." });
      return;
    }

    const { query } = this.props;
    query["page"] = 1;
    query["skip"] = 0;
    this.getProducts(query);
  };

  // Reset form and refetch all products -----------------
  onResetFilter = async e => {
    // set state back to initial settings
    await this.setState(() => ({
      searchType: "string",
      searchOption: "productName",
      value: "",
      value2: "",
      valueErr: "",
      disableValue2: true
    }));

    // set intial query settings
    const query = {
      page: 1,
      skip: 0,
      limit: 20
    };
    // fetch all of the products
    this.getProducts(query);
  };

  render() {
    // props
    const { loading, products, query } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!products || !products.length) {
    } else {
      content = <CardList data={productCardData(products)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getProducts} />
        <Heading title="Products" />
        <Paginator query={query} cb1={this.getProducts} />
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
          handleDateChange={this.handleDateChange}
          handleDateChange2={this.handleDateChange2}
          handleUseValue2={this.handleUseValue2}
          onSearchProduct={this.onSearchProduct}
          onResetFilter={this.onResetFilter}
        />
        <div style={{ height: "15px" }} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, product }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading,
  products: product.products,
  query: product.query
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetProducts, resetProducts }
)(Products);

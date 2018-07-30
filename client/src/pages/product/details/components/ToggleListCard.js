import React, { Component } from "react";

class ToggleListCard extends Component {
  state = {
    viewAll: false
  };

  viewAll = () => {
    this.setState({ viewAll: true });
  };

  hide = () => {
    this.setState({ viewAll: false });
  };

  renderShowBtn = (css = "", btnCss = "", label) => {
    return (
      <div className={`col-12 ${css}`}>
        <button className={`btn btn-primary ${btnCss}`} onClick={this.viewAll}>
          <i className="fas fa-eye mr-2  d-none d-sm-inline " />
          All {label}
        </button>
      </div>
    );
  };

  renderHideBtn = (css = "", btnCss = "", label) => {
    return (
      <div className={`col-12 ${css}`}>
        <button className={`btn btn-primary ${btnCss}`} onClick={this.hide}>
          <i className="fas fa-eye-slash mr-2 d-none d-sm-inline " />
          Hide {label}
        </button>
      </div>
    );
  };

  render() {
    const { array, label, amountToDisplay = 2, width = 12 } = this.props;
    let cardArray = array;

    if (!Array.isArray(cardArray)) cardArray = [];

    const length = cardArray.length;

    const information = (
      <small className="form-text text-muted mb-2 ml-1">
        * There are {length} {label.toLowerCase()} in total click view all to
        see the full list.
      </small>
    );

    const toggleBtn = this.state.viewAll ? (
      <div className="row  mb-3">
        <div className="col-12 d-none d-sm-block">
          {this.renderHideBtn("d-flex justify-content-sm-end", "mr-2", label)}
        </div>

        <div className="col-12 d-block d-sm-none">
          {this.renderHideBtn("d-flex flex-column", "mb-3", label)}
        </div>
      </div>
    ) : (
      <div className="row  mb-3">
        <div className="col-12 d-none d-sm-block">
          {this.renderShowBtn("d-flex justify-content-sm-end", "mr-2", label)}
        </div>

        <div className="col-12 d-block d-sm-none">
          {this.renderShowBtn("d-flex flex-column", "mb-3", label)}
        </div>
      </div>
    );

    const cardWidth = `card card-body mb-3 col-${width} mx-auto`;

    const filteredList = cardArray.map(
      (item, i) =>
        i >= amountToDisplay ? null : (
          <li className="list-group-item" key={i}>
            {item}
          </li>
        )
    );

    const list = cardArray.map((item, i) => (
      <li className="list-group-item" key={i}>
        {item}
      </li>
    ));

    return (
      <div className={cardWidth}>
        {length > 3 ? toggleBtn : null}
        <div className="row">
          <div className="col-12">
            <div className="text-center clear-fix">
              <h4 className="pb-3">
                <strong>{label}</strong>
              </h4>
            </div>

            {list.length === 0 && (
              <h6 className="pr-5">
                {"No " + label.toLowerCase() + " added yet."}
              </h6>
            )}

            {length > 3 ? information : null}
            <ul className="list-group list-group-flush">
              {this.state.viewAll ? list : filteredList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ToggleListCard;

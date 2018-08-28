import React, { Component } from "react";
import QrCode from "qrcode.react";
// custom components
import PrintBarcode from "./components/PrintBarcode";
// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// utils
import getUrlParameter from "../../utils/getUrlParameter";
// actions

class BarcodeCreate extends Component {
  state = {
    type: "",
    id: ""
  };
  // lifecycles -------------------------------
  componentDidMount() {
    this.stateSetup();
  }

  // setup state with url params
  stateSetup = () => {
    const type = getUrlParameter("type");
    let id;

    switch (type) {
      case "storage":
        id = this.props.match.params.storageId;
        this.setState({ type, id });
        break;

      case "rack":
        id = this.props.match.params.rackId;
        this.setState({ type, id });
        break;

      case "shelf":
        id = this.props.match.params.shelfId;
        this.setState({ type, id });
        break;

      case "shelfSpot":
        id = this.props.match.params.shelfSpotId;
        this.setState({ type, id });
        break;

      case "box":
        id = this.props.match.params.boxId;
        this.setState({ type, id });
        break;

      default:
        id = this.props.match.params.productId;
        this.setState({ type: "product", id });
        break;
    }
  };

  render() {
    const { type, id } = this.state;

    const printBtn = (
      <button
        className="btn btn-info btn-block"
        onClick={() => PrintBarcode(type, id)}
      >
        <i className="fas fa-print mr-2" /> Print Barcode
      </button>
    );

    return (
      <div className="container">
        <Message />
        <Heading title="Create Barcode" />
        <div className="row mt-1">
          <div className="col-xs-12 col-md-10 mx-auto">
            <div className="row">
              <div className="col-xs-12 col-md-2 mt-3">
                <QrCode
                  className="my-3 d-block mx-auto"
                  value={`/${type}/${id}`}
                />
              </div>

              <div className="col-xs-12 col-md-9 mx-auto">
                <div className="col-12 input-group mt-4 mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="barcodeType">
                      Type
                    </label>
                  </div>
                  <input
                    disabled={true}
                    value={type}
                    type="text"
                    className="form-control"
                    id="barcodeType"
                  />
                </div>
                <div className="col-12  input-group my-4">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="idInput">
                      Id
                    </label>
                  </div>
                  <input
                    id="idInput"
                    type="text"
                    disabled={true}
                    className="form-control"
                    value={id}
                  />
                </div>
                <div className="col-12 mx-auto">{printBtn}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BarcodeCreate;

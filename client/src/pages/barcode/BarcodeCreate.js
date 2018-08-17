import React, { Component } from "react";
import QrCode from "qrcode.react";
// custom components
// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// utils
import getUrlParameter from "../../utils/getUrlParameter";
// actions

class BarcodeCreate extends Component {
  state = {
    type: "",
    storageId: ""
  };
  // lifecycles -------------------------------
  componentDidMount() {
    this.stateSetup();
  }

  // setup state with url params
  stateSetup = () => {
    const type = getUrlParameter("type");
    let storageId;

    switch (type) {
      case "storage":
        storageId = this.props.match.params.storageId;
        this.setState({ type, storageId });
        break;

      default:
        break;
    }
  };

  render() {
    const { type, storageId } = this.state;

    const printBtn = (
      <button className="btn btn-info btn-block">
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
                  value={`/${type}/${storageId}`}
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
                    value={storageId}
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

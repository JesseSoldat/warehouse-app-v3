import React from "react";
import ReactDOM from "react-dom";
import QrCode from "qrcode.react";

const PrintBarcode = (type, storageId) => {
  this.printWindow = window.open(
    "",
    "",
    "width=600,height=400,left=200,top=200"
  );

  const divEle = document.createElement("div");
  divEle.setAttribute("id", "newCanvas");
  this.printWindow.document.body.appendChild(divEle);

  ReactDOM.render(
    <QrCode value={`/${type}/${storageId}`} />,
    this.printWindow.document.getElementById("newCanvas")
  );

  this.printWindow.print();
  this.printWindow.close();
};

export default PrintBarcode;

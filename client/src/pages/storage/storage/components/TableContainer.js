import React from "react";

// custom components
import RackTable from "./RackTable";
import ShelfTable from "./ShelfTable";
import ShelfSpotTable from "./ShelfSpotTable";

const TableContainer = ({ rack = null, storageType = null }) => {
  if (!rack || !storageType) return null;

  let content;

  switch (storageType) {
    case "rack":
      content = <RackTable rack={rack} storageType={storageType} />;
      break;

    case "shelf":
      content = <ShelfTable rack={rack} storageType={storageType} />;
      break;

    // case "shelfSpot":
    //   content = <ShelfSpotTable rack={rack} storageType={storageType} />;
    //   break;

    default:
      content = null;
      break;
  }

  return (
    <div className="col-12 d-flex justify-content-around flex-wrap mt-4">
      {content}
    </div>
  );
};

export default TableContainer;

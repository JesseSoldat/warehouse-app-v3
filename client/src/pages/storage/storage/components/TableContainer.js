import React from "react";

// custom components
import RackTable from "./RackTable";
import ShelfTable from "./ShelfTable";
import ShelfSpotTable from "./ShelfSpotTable";

const TableContainer = ({
  rack = null,
  storageType = null,
  shelfId,
  shelfSpotId
}) => {
  if (!rack || !storageType) return null;

  let content;

  switch (storageType) {
    case "rack":
      content = <RackTable rack={rack} />;
      break;

    case "shelf":
      content = <ShelfTable rack={rack} shelfId={shelfId} />;
      break;

    case "shelfSpot":
      content = (
        <ShelfSpotTable
          rack={rack}
          shelfId={shelfId}
          shelfSpotId={shelfSpotId}
        />
      );
      break;

    default:
      break;
  }

  return content;
};

export default TableContainer;

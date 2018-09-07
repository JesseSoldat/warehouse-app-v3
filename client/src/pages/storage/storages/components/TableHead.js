import React from "react";
import { Link } from "react-router-dom";

// common components
import IconBtn from "../../../../components/buttons/IconBtn";

const TableHead = ({ storageId, maxShelves = 0 }) => {
  return (
    <thead>
      <tr style={{ width: 95 }}>
        <td>
          <Link to={`/rack/create/${storageId}?type=rack`}>
            <IconBtn
              btnClass="btn-default"
              iconClass="fa-plus-circle mr-1"
              text="New Rack"
            />
          </Link>
        </td>
        {maxShelves === 0 ? (
          <th scope="col">No shelves yet - select a rack to create one</th>
        ) : (
          [...Array(maxShelves).keys()].map(key => (
            <th key={`shelf-header-${key + 1}`} scope="col">
              Shelf {key + 1}
            </th>
          ))
        )}
      </tr>
    </thead>
  );
};

export default TableHead;

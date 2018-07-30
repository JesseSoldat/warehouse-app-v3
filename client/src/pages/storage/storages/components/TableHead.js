import React from "react";
import { Link } from "react-router-dom";

const TableHead = ({ id, maxShelves = 0 }) => {
  return (
    <thead>
      <tr style={{ width: 95 }}>
        <td>
          <Link to={`/storages/create/${id}?type=rack`}>
            <button className="btn btn-default">
              <i className="fas fa-plus-circle mr-2" /> New Rack
            </button>
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

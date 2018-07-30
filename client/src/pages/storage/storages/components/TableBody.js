import React from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../../../utils/validation/isEmpty";

const TableBody = ({ racks = [] }) => {
  return (
    <tbody>
      {racks.length === 0 ? (
        <tr>
          <td>No racks yet</td>
        </tr>
      ) : (
        racks.map(({ _id: rackId = "", shelves = [], rackLabel = "" }, i) => {
          return (
            <tr key={`rack-body-${i}`}>
              <th scope="row">
                <Link to={`/storages/${rackId}?type=rack`}>
                  Rack {rackLabel}
                </Link>
              </th>
              {shelves.length === 0
                ? null
                : shelves.map(
                    (shelf = null, i) =>
                      !isEmpty(shelf) && (
                        <td key={`shelf-body-${i}`}>
                          <Link to={`/storages/${shelf._id}?type=shelf`}>
                            Shelf Spots{" "}
                            {shelf.shelfSpots.length
                              ? shelf.shelfSpots.length
                              : 0}
                          </Link>
                        </td>
                      )
                  )}
            </tr>
          );
        })
      )}
    </tbody>
  );
};

export default TableBody;

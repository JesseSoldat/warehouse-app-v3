import React from "react";

const TableHead = ({ createNewUser }) => {
  return (
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th>
          <button onClick={createNewUser} className="btn btn-secondary">
            <i className="fas fa-plus-circle mr-2" /> Create New User
          </button>
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;

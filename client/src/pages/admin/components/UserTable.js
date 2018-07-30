import React from "react";

// custom components
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const UserTable = ({ users, createNewUser, handleChange, handleDelete }) => {
  return (
    <div className="table-responsive-xs table-responsive-sm">
      <table className="table table-striped col-12">
        <TableHead createNewUser={createNewUser} />
        <TableBody
          users={users}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      </table>
    </div>
  );
};

export default UserTable;

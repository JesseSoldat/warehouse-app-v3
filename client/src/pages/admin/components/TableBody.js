import React from "react";

const TableBody = ({ users, handleChange, handleDelete }) => {
  const selectBox = ({ email, role }) => (
    <div className="input-group mb-3">
      <select
        defaultValue={role}
        className="custom-select mr-3"
        onChange={e => handleChange(email, e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
  );

  const tableData = users.map((user, i) => (
    <tr key={user._id}>
      <td> </td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td style={{ display: "inline-block", width: 150 }}>{selectBox(user)}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(user.email)}
        >
          <i className="fas fa-trash-alt mr-2" /> Delete User
        </button>
      </td>
    </tr>
  ));

  return <tbody>{tableData}</tbody>;
};

export default TableBody;

import React from "react";

// common components
import IconBtn from "../../../components/buttons/IconBtn";

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

  const tableData = users.map(user => (
    <tr key={user._id}>
      <td> </td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td style={{ display: "inline-block", width: 150 }}>{selectBox(user)}</td>
      <td>
        <IconBtn
          btnClass="btn-danger"
          iconClass="fa-trash-alt mr-1"
          text="Delete User"
          cb={() => handleDelete(user.email)}
        />
      </td>
    </tr>
  ));

  return <tbody>{tableData}</tbody>;
};

export default TableBody;

import React, { Component } from "react";
import { connect } from "react-redux";

// common components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
import Spinner from "../../components/Spinner";
// custom components
import UserTable from "./components/UserTable";
// utils
import clearUiMsg from "../../utils/clearUiMsg";
// actions
import { sendServerMsg } from "../../actions/ui";
import {
  startGetAllUsers,
  changeUserRole,
  deleteUser
} from "../../actions/admin";

class ManageUsers extends Component {
  // lifecycles -----------------------------------------
  componentDidMount() {
    this.getAllUser();
  }

  componentWillUnmount() {
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "manageUserClearMsg" });
  }

  // api calls ---------------------------------------------
  getAllUser = () => {
    if (this.props.users.length) return;
    this.props.startGetAllUsers();
  };

  handleChange = (email, role) => this.props.changeUserRole(role, email);

  handleDelete = email => this.props.deleteUser(email);

  render() {
    const { loading, users } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!loading && !users.length) {
      content = (
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">No Users</h3>
          </div>
        </div>
      );
    } else {
      content = (
        <UserTable
          users={users}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
        />
      );
    }

    return (
      <div className="container mb-5">
        <Message />
        <Heading title="User management" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, admin }) => ({
  msg: ui.msg,
  users: admin.allUsers,
  loading: ui.loading,
  options: ui.options
});

export default connect(
  mapStateToProps,
  { sendServerMsg, startGetAllUsers, changeUserRole, deleteUser }
)(ManageUsers);

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
import {
  sendServerMsg,
  startLoading,
  startShowOverlay
} from "../../actions/ui";
import {
  startGetAllUsers,
  changeUserRole,
  deleteUser
} from "../../actions/admin";

class ManageUsers extends Component {
  // Lifecycles -----------------------------------------
  componentDidMount() {
    this.getAllUser();
  }

  componentWillUnmount() {
    const { msg, sendServerMsg } = this.props;
    // check to see if the UiMsg should be cleared
    clearUiMsg({ msg, sendServerMsg, from: "manageUserClearMsg" });
  }

  // Api / Store  ---------------------------------------------
  getAllUser = () => {
    // Load from the STORE
    if (this.props.users.length) return;

    // Load from the API
    this.props.startLoading({ from: "manageUserLoading" });
    this.props.startGetAllUsers();
  };

  // Events -------------------------------------------------------
  handleChange = (email, role) => {
    this.props.startShowOverlay({ from: "manageUserUpdateShowOverlay" });
    this.props.changeUserRole(role, email);
  };

  handleDelete = email => {
    this.props.startShowOverlay({ from: "manageUserDeleteShowOverlay" });
    this.props.deleteUser(email);
  };

  // Render ---------------------------------------------
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
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  {
    sendServerMsg,
    startLoading,
    startShowOverlay,
    startGetAllUsers,
    changeUserRole,
    deleteUser
  }
)(ManageUsers);

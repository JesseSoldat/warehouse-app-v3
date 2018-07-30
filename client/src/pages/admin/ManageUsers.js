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
import { changeRoute } from "../../actions/router";
import { serverMsg } from "../../actions/ui";
import { startGetAllUsers } from "../../actions/admin";

class ManageUsers extends Component {
  // lifecycles -----------------------------------------
  componentDidMount() {
    this.getAllUser();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/admin/manageUsers");
  }

  // api calls ---------------------------------------------
  getAllUser = () => {
    this.props.startGetAllUsers();
  };

  // cb for child components
  createNewUser = () => {};

  handleChange = (email, newRole) => {
    console.log(email, newRole);
  };

  handleDelete = email => {
    console.log(email);
  };

  render() {
    const { loading, users } = this.props;

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!loading && !users.length) {
      content = <h1>No Users</h1>;
    } else {
      content = (
        <UserTable
          users={users}
          createNewUser={this.createNewUser}
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
  { serverMsg, changeRoute, startGetAllUsers }
)(ManageUsers);

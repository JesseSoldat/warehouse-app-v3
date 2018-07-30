import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { startLogout } from "../actions/auth";

const NavBar = ({ isAuth, startLogout, history }) => {
  const brandRoute = isAuth ? "/dashboard" : "/";
  const brand = (
    <Link className="navbar-brand" to={brandRoute}>
      Warehouse
    </Link>
  );
  const publicRoutes = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-3 pb-sm-3 pt-sm-3 pt-md-0 pb-md-0">
        <Link to="/login">
          <i className="fa fa-sign-in-alt mr-2" />
          Login
        </Link>
      </li>
      <li className="nav-item pb-sm-3 pb-md-0">
        <Link to="/register">
          <i className="fa fa-edit mr-2" />
          Register
        </Link>
      </li>
    </ul>
  );
  const privateRoutes = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown mr-3 pb-sm-3 pt-sm-3 pt-md-0 pb-md-0">
        <Link
          className="dropdown-toggle"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          to="/search"
        >
          <i className="fas fa-search mr-2" />
          Search
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/products/search">
            Products
          </Link>
          <Link className="dropdown-item" to="/producers/search">
            Producers
          </Link>
          <Link className="dropdown-item" to="/customers/search">
            Customers
          </Link>
          <Link className="dropdown-item" to="/storages/search">
            Storages
          </Link>
        </div>
      </li>

      <li className="nav-item dropdown mr-3 pb-sm-3 pb-md-0">
        <Link
          className="dropdown-toggle"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          to="/create"
        >
          <i className="fas fa-plus mr-2" />
          Create
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/products/create">
            New Product
          </Link>
          <Link className="dropdown-item" to="/producers/create">
            New Producer
          </Link>
          <Link className="dropdown-item" to="/customers/create">
            New Customer
          </Link>
          <Link
            className="dropdown-item"
            to="/storages/create/storage?type=box"
          >
            New Storage Box
          </Link>
        </div>
      </li>

      <li className="nav-item mr-3 pb-sm-3 pb-md-0">
        <Link to="/storages">
          <i className="fas fa-archive mr-2" /> Storages
        </Link>
      </li>

      <li className="nav-item dropdown mr-3 pb-sm-3 pb-md-0">
        <Link
          className="dropdown-toggle"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          to="/admin"
        >
          <i className="fas fa-unlock-alt mr-2" />
          Admin
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/admin/manageUsers">
            Manage User
          </Link>
          <Link className="dropdown-item" to="/admin/playground">
            Playground
          </Link>
        </div>
      </li>

      <li className="nav-item mr-3 pb-sm-3 pb-md-0">
        <a href="" onClick={e => onStartLogout(e)}>
          <i className="fas fa-sign-out-alt mr-2" />
          Logout
        </a>
      </li>
    </ul>
  );

  const onStartLogout = e => {
    e.preventDefault();
    startLogout();
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      {" "}
      {brand}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mobile"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="mobile">
        <ul className="navbar-nav mr-auto" />
        {isAuth ? privateRoutes : publicRoutes}
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth._id
});

export default connect(
  mapStateToProps,
  { startLogout }
)(NavBar);

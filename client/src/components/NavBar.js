import React from "react";
import { connect } from "react-redux";

// custom components
import SiteLink from "./links/SiteLink";
import MenuLink from "./links/MenuLink";
import DropdownLink from "./links/DropdownLink";
// actions
import { startLogout } from "../actions/auth";

const NavBar = ({ isAuth, startLogout }) => {
  const brand = (
    <SiteLink
      text="Warehouse"
      url={isAuth ? "/dashboard" : "/"}
      linkCss="navbar-brand"
    />
  );

  // responsive css for all of the navbar links
  const navLinkClass = "nav-item mr-2 py-2 my-md-0 py-md-0";

  const publicRoutes = (
    <ul className="navbar-nav ml-auto">
      <li className={`${navLinkClass} mt-2 mt-md-0`}>
        <SiteLink text="Login" icon="fa-sign-in-alt" />
      </li>
      <li className={navLinkClass}>
        <SiteLink text="Register" icon="fa-edit" />
      </li>
    </ul>
  );

  const privateRoutes = (
    <ul className="navbar-nav ml-auto">
      <li className={`dropdown ${navLinkClass} mt-2 mt-md-0`}>
        <MenuLink text="Search" icon="fa-search" />
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <DropdownLink text="Products" />
          <DropdownLink text="Producers" />
          <DropdownLink text="Customers" />
          <DropdownLink text="Storages" />
          <DropdownLink text="Boxes" />
        </div>
      </li>

      <li className={navLinkClass}>
        <SiteLink text="Scan" icon="fa-barcode" />
      </li>

      <li className={`dropdown ${navLinkClass}`}>
        <MenuLink text="Create" icon="fa-plus" />
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <DropdownLink text="New Product" />
          <DropdownLink text="New Producer" />
          <DropdownLink text="New Customer" />
          <DropdownLink text="New Storage Box" />
        </div>
      </li>

      <li className={navLinkClass}>
        <SiteLink text="Storage" icon="fa-archive" />
      </li>

      <li className={`dropdown ${navLinkClass}`}>
        <MenuLink text="Admin" icon="fa-unlock-alt" />
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <DropdownLink text="Manage User" />
        </div>
      </li>

      <li className={navLinkClass}>
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
    <nav className="navbar navbar-expand-md navbar-dark bg-dark site-navbar">
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

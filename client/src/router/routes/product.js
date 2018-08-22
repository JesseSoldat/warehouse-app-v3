import React from "react";

import PrivateRoute from "../PrivateRoute";

import Products from "../../pages/product/products/Products";
import CreateProduct from "../../pages/product/form/CreateProduct";
import EditProduct from "../../pages/product/form/EditProduct";
import Product from "../../pages/product/details/Product";
import ProductImages from "../../pages/product/images/ProductImages";

const ProductRoutes = [
  <PrivateRoute
    key="products/search"
    path="/products/search"
    component={Products}
    exact
  />,
  <PrivateRoute
    key="create-product"
    path="/products/create"
    component={CreateProduct}
    exact
  />,
  <PrivateRoute
    key="edit-product"
    path="/products/edit/:productId"
    component={EditProduct}
    exact
  />,
  <PrivateRoute
    key="product"
    path="/products/:productId"
    component={Product}
    exact
  />,
  <PrivateRoute
    key="product/images"
    path="/products/images/:productId"
    component={ProductImages}
    exact
  />
];

export default ProductRoutes;

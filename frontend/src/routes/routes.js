import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from  "../components/login.js";
import { Dashboard } from "../components/pages/dashboard/dashboard.js";
import PrivateRoute from "./privateRoutes.js";
import { AddProduct } from "../components/pages/product/addProduct.js";
import { AddCategory } from "../components/pages/category/addcategory.js";


function DefaultRoutes() {
  return (
    <section className="page">
      <Router> 
        <Routes>
          <Route exact path="/" element={<Login />} />  
          <Route exact path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
          <Route exact path="/addproduct" element={<PrivateRoute Component={AddProduct} />} />         
          <Route exact path="/editproduct/:id" element={<PrivateRoute Component={AddProduct} />} />
          <Route exact path="/addcategory" element={<PrivateRoute Component={AddCategory} />} />
          <Route exact path="/editcategory/:id" element={<PrivateRoute Component={AddCategory} />} />
        </Routes>
      </Router>
    </section>
  );
}

export default DefaultRoutes;

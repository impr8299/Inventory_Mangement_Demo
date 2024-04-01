import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "../style/sidebar.css";

function Sidebar() {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <span className="brand-name fs-4">LOGO</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        
        <NavLink className="list-group-item py-2" to="/dashboard"> 
          <i className="bi bi-house fs-5 me-3"></i> <span>Dashboard</span>
        </NavLink>
        
        <NavLink className="list-group-item py-2" to="/addproduct"> 
          <i className="bi bi-table fs-5 me-3"></i> <span>Products</span>
        </NavLink>
        
        <NavLink className="list-group-item py-2" to="/addcategory"> 
          <i className="bi bi-clipboard-data fs-5 me-3"></i>
          <span>Category</span>
        </NavLink>
        
      </div>
    </div>
  );
}

export { Sidebar };

import React from "react";
import AdminCateg from "../components/AdminCateg"

const Admin = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-6"></div>
        <div className="col-6">
          <AdminCateg />
        </div>
      </div>
    </div>
  );
};

export default Admin;

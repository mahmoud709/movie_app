import React from "react";

export default function Notfound() {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#131722" }}
    >
      <div className="text-center">
        <h1 className="display-4 text-white">404</h1>
        <p className="lead text-white">Page Not Found</p>
      </div>
    </div>
  );
}

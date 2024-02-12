import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
export default function Navbar({ userData, logout }) {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand text-white fw-bold " to="/">
          My Cima
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon fa-solid fa-bars text-white mt-2 fs-4"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userData?<li className="nav-item">
              <Link className="nav-link active" to="/home">
                Home
              </Link>
            </li>:''}
          </ul>
          <form className="d-flex position-relative" role="search">
            <input
              className="form-control searchInp me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <i className="fa-solid fa-magnifying-glass position-absolute"></i>
          </form>
          <div className="socialIcons">
            <i className="fa-brands fa-facebook fs-5"></i>
            <i className="fa-brands fa-spotify fs-5"></i>
            <i className="fa-brands fa-square-instagram fs-5"></i>
            <i className="fa-brands fa-youtube fs-5"></i>
          </div>
          <div className="registerion d-flex ms-2">
            {localStorage.getItem("token") ? (
              <span className="ms-1 text-white logoutBtn" onClick={logout}>
                Logout
              </span>
            ) : (
<<<<<<< HEAD
              ""
=======
            ""
>>>>>>> 0a3ce6f11f6aa4e876fa4b1f9243d9d790dc9143
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

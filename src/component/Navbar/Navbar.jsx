import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="navbar-brand" to="/">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="navbar-brand" to="/users">
              Accounts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { FaBell, FaEnvelope, FaSearch, FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../store/reducer/User';

const Navbar = () => {

const dispath=useDispatch()


  const handlelogout=()=>{
    dispath(logoutUser())
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2">
      <a className="navbar-brand fw-bold text-primary" href="/">MySocial</a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">

        {/* Search Bar */}
        <form className="d-flex mx-auto my-2 my-lg-0 w-50">
          <input
            className="form-control me-2 rounded-pill px-4"
            type="search"
            placeholder="Search friends or posts..."
          />
          <button className="btn btn-outline-primary rounded-pill" type="submit">
            <FaSearch />
          </button>
        </form>

        {/* Icons & Profile */}
        <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
          <li className="nav-item">
            <FaEnvelope size={20} className="text-secondary" />
          </li>
          <li className="nav-item">
            <FaBell size={20} className="text-secondary" />
          </li>

          {/* Profile Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              id="profileDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle size={28} className="text-primary" />
              <span className="ms-2 d-none d-lg-inline fw-semibold">Faiz</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><NavLink className="dropdown-item" to="/profile">My Profile</NavLink></li>
              <li><NavLink className="dropdown-item" to="/settings">Settings</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item text-danger" to="/register" onClick={handlelogout} >Logout</NavLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

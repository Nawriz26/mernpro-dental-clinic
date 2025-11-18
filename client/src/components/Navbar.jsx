import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePatients } from '../context/PatientContext';
import logo from '../assets/LogoTeam2.jpg';
import { useDarkMode } from '../context/DarkModeContext';


export default function Navbar() {
  const { user, logout } = useAuth();
  const { patientCount } = usePatients();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center nav-link-animated ${
      isActive ? 'active fw-semibold text-warning' : 'text-white-50'
    }`;
  const { isDark, toggleDarkMode } = useDarkMode();


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm">
      {/* Logo + Brand */}
      <Link
        className="navbar-brand d-flex align-items-center nav-brand-animated"
        to="/"
        onClick={closeMenu}
      >
        <img
          src={logo}
          alt="MERNPro Logo"
          style={{
            height: '40px',
            width: '40px',
            objectFit: 'cover',
            borderRadius: '6px',
            marginRight: '10px'
          }}
        />
        <span className="fw-bold text-white">MERNPro Dental</span>
      </Link>

      {/* Hamburger */}
      <button
        className="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>

        {/* LEFT LINKS */}
        <ul className="navbar-nav me-auto">
          {/* Home */}
          <li className="nav-item">
            <NavLink className={navLinkClass} to="/" onClick={closeMenu}>
              <i className="bi bi-house me-1"></i> Home
            </NavLink>
          </li>

          {/* Guest links */}
          {!user && (
            <>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/login" onClick={closeMenu}>
                  <i className="bi bi-box-arrow-in-right me-1"></i> Sign In
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={navLinkClass} to="/signup" onClick={closeMenu}>
                  <i className="bi bi-person-plus me-1"></i> Sign Up
                </NavLink>
              </li>
            </>
          )}

          {/* Auth links */}
          {user && (
            <>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/dashboard" onClick={closeMenu}>
                  <i className="bi bi-grid me-1"></i> Dashboard
                  {patientCount > 0 && (
                    <span className="badge bg-warning text-dark ms-2">
                      {patientCount}
                    </span>
                  )}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={navLinkClass} to="/appointments" onClick={closeMenu}>
                  <i className="bi bi-calendar-event me-1"></i> Appointments
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={navLinkClass} to="/profile" onClick={closeMenu}>
                  <i className="bi bi-person-circle me-1"></i> My Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav align-items-center">
  {/* Dark mode toggle */}
      <li className="nav-item me-2">
        <button
          className="btn btn-outline-light btn-sm btn-animated"
          type="button"
          onClick={toggleDarkMode}
        >
          <i className={`bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'} me-1`}></i>
          {isDark ? 'Light' : 'Dark'}
        </button>
      </li>

      {user && (
        <>
          {/* <li className="nav-item me-2">
            <span className="navbar-text text-white-50 small">
              Welcome,&nbsp;
              <span className="fw-semibold text-white">
                {user.username}
              </span>
            </span>
          </li> */}

          {/* <li className="nav-item">
            <button
              className="btn btn-light btn-sm btn-animated"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Sign Out
            </button>
          </li> */}
        </>
      )}
    </ul>


        {/* RIGHT: Welcome + Sign Out */}
        <ul className="navbar-nav align-items-center">
          {user && (
            <>
              <li className="nav-item me-2">
                <span className="navbar-text text-white-50 small">
                  Welcome,&nbsp;
                  <span className="fw-semibold text-white">
                    {user.username}
                  </span>
                </span>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-light btn-sm btn-animated"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

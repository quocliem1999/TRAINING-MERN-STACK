import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { logout } from '../Service/AccountService';

function Navigation() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const onLogout = () => {
    logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavbar = () => {
    return (
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-0 mx-lg-1">
            <NavLink className="nav-link py-3 px-0 px-lg-3 rounded" exact to="/">
              Trang Chủ
            </NavLink>
          </li>
          <li className="nav-item mx-0 mx-lg-1">
            <NavLink className="nav-link py-3 px-0 px-lg-3 rounded" to="/login">
              Đăng Nhập
            </NavLink>
          </li>
          <li className="nav-item mx-0 mx-lg-1">
            <NavLink className="nav-link py-3 px-0 px-lg-3 rounded" to="/register">
              Đăng Ký
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };

  const authenticatedNavbar = () => {
    if (user.role === 'admin') {
      return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mx-0 mx-lg-1">
              <NavLink className="nav-link py-3 px-0 px-lg-3 rounded" exact to="/">
                Trang Chủ
              </NavLink>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <NavLink className="nav-link py-3 px-0 px-lg-3 rounded" to="/admin">
                Admin
              </NavLink>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <Link onClick={onLogout} className="nav-link py-3 px-0 px-lg-3 rounded" to="/">
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mx-0 mx-lg-1">
              <NavLink className="nav-link py-3 px-0 px-lg-3 rounded" exact to="/">
                Trang Chủ
              </NavLink>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <NavLink className="nav-link py-3 px-0 px-lg-3 rounded" to="/profile">
                Hồ Sơ Cá Nhân
              </NavLink>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <Link onClick={onLogout} className="nav-link py-3 px-0 px-lg-3 rounded" to="/">
                Đăng xuất
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
        id="mainNav"
      >
        <div className="container transi">
          <a className="navbar-brand" href="/">
            Tuyển Dụng
          </a>
          <button
            className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars" />
          </button>
          {isAuthenticated ? authenticatedNavbar() : unauthenticatedNavbar()}
        </div>
      </nav>
    </>
  );
}

export default Navigation;

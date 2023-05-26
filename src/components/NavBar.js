import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

function NavBar() {
  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPath("home");
        break;
      case "/watchlist":
        setPath("watchlist");
        break;
      case "/wallet":
        setPath("wallet");
        break;
      default:
        setPath("");
        break;
    }
  }, [location]);

  return (
    <header id="header" className="position-sticky top-0">
      <nav className="container navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" id="navTitle">
            CryptoTrack
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${path === "home" && "active"}`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${path === "watchlist" && "active"}`}
                  to="watchlist"
                >
                  WatchList
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${path === "wallet" && "active"}`}
                  to="wallet"
                >
                  Wallet
                </Link>
              </li>
            </ul>
            <Search />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;

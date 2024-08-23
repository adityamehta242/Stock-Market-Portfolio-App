import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const NavBar = () => {
    return (
        <nav>
            <NavLink to="/stocks" activeClassName="active">Stocks</NavLink>
            <NavLink to="/watchlist" activeClassName="active">Watchlist</NavLink>
        </nav>
    );
};

export default NavBar;

import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

interface navbarProps {};

const Navbar = (props : navbarProps) => {
    return (
        <nav>
            <ul className="navlinks">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
                <li>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;
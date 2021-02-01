import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
    
    return (
        <nav>
            <ul className="navlinks">
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;
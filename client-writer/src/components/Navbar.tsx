import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

interface navbarProps {
    user: string | null
};

const Navbar = (props : navbarProps) => {
    
    return (
        <nav>
            <ul className="navlinks">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/posts/new">Create Post</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
                <li>
                    {props.user}
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;
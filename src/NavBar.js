import React from "react";
import {Link} from "react-router-dom"

const NavBar = () => {
    return (
        <nav>
            <div className="nav-bar">
                <Link to="/">Home</Link>
            </div>
        </nav>
    )
}

export default NavBar
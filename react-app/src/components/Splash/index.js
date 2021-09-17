import React from "react";
import { Link } from "react-router-dom";
import "./splash.css"

function Splash() {
    return (
        <div className="splashContainer">
            <h1 id="splashTitle">Party Lure</h1>
            <h2 id="splashSub">The best party finder for the best MMO</h2>
            <div className="splashLinkDiv">
                <Link to="/sign-up" className="splashLinks">Sign up</Link> 
                <Link to="login" className="splashLinks">Log in</Link>
            </div>
        </div>
    )
}

export default Splash

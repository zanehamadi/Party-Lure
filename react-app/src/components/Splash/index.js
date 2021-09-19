import React from "react";
import { Link } from "react-router-dom";
import "./splash.css"
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function Splash() {


    const dispatch = useDispatch();
    useSelector(state => state.session.user)

    let credential = 'Demo Fish'
    let password = 'password'
    let demoLogin = () => { return dispatch(sessionActions.login(credential, password)) }


    return (
        <div className="splashContainer">
            <img src="https://cdn.discordapp.com/attachments/844445050615889922/889266681552187432/Untitled42_20210919153126-removebg-preview.png"/>
            <h1 id="splashTitle">Party Lure</h1>
            <h2 id="splashSub">The best party finder for the best MMO</h2>
            <div className="splashLinkDiv">
                <Link to="/sign-up" className="splashLinks">Sign up</Link> 
                <Link to="login" className="splashLinks">Log in</Link>
                <Link to="/posts" className="splashLinks">View Posts</Link>
                <a className="splashLinks" onClick={demoLogin}>Demo</a>
            </div>
        </div>
    )
}

export default Splash

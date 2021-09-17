import React from "react";
import { Link } from 'react-router-dom';
import "./PageNotFound.css"

function PageNotFound() {
    return (
        <div className='routeDiv'>
            <div className='containContainer'>
                <div className='routeContainer'>
                    <h1 className='foohfo'>404</h1>
                    <h3 className='top404message'>You expected a page to load but instead ran into Bruce.</h3>
                    <img className='foohfoimg' alt="404 pug" src={'https://thumbs.gfycat.com/SeriousPepperyApatosaur-size_restricted.gif'}></img>
                    <h3 className='bottom404message'>Click <Link to='/'>here</Link> so we can get you back to making parties.</h3>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound

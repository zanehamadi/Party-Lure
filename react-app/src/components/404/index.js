import React from "react";
import { Link } from 'react-router-dom';
import "./PageNotFound.css"

function PageNotFound() {
    return (
        <div className='not-found-page'>
            <div className='pnf-container'>
                <h1 className='pnf-alert'>🐟 Oops! 🐟</h1>
                <h3 className='pnf-text'>You seem to have strayed away from our designated swimming waters.</h3>
                <h3 className='pnf-error-text'>Page not found:</h3>
                <h3 className='pnf-error-text-2'>Error Code: (404)</h3>
                <img className='pnf-img' alt="404 img" src={'https://thumbs.gfycat.com/SeriousPepperyApatosaur-size_restricted.gif'}></img>
                <h3 className='pnf-redirect'>Click <Link className='pnf-redirect-link' to='/'>here</Link> so we can get you back to making parties.</h3>
            </div>
        </div>
    )
}

// comment needed to push for whatever reason
export default PageNotFound

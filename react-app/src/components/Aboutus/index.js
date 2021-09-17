import { Link } from 'react-router-dom';
import "./AboutUs.css"

export default function AboutUs() {
    return (
        <div className='about-us-page'>
            <div className='aboutus'>
                <h3 className='team-name'>Team42</h3>
                <img className='about-image' alt="404 pug" src={'https://c.tenor.com/LH7fjySc35UAAAAM/monkey-cool.gif'}></img>
                <p className='body-text'>Our non-existent mmo Abyss Adventure has been around for 13 years and we at Team42 are always thinking of ways to provide you,
                    the players, with a better experience. So we went into our reef and got to brain storming and came up with an alternative way
                    of finding other players to team up with and either casually play or tackle the hardest content we have to offer.</p>
                <div className='team-body'>
                    Meet the team:
                    <div className='team-cards'>
                        <div className='cam-card'>
                            <div>
                                <Link className='' to={{ pathname: 'https://github.com/CamChandler98' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link>
                                {/* <span><Link className='gitHubLink' to={{ pathname: '' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span> */}
                            </div>
                            Cam Chandler
                        </div>
                        <div className='k-card'>
                            <div>
                                <span><Link className='' to={{ pathname: 'https://github.com/Kristianmartinw' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                                <span><Link className='' to={{ pathname: 'https://www.linkedin.com/in/kristian-martinez-40137b21b/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                            </div>
                            Kristian Martinez
                        </div>
                        <div className='tan-card'>
                            <div>
                                <span><Link className='' to={{ pathname: 'https://github.com/VoodooJellyfish' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                                <span><Link className='' to={{ pathname: 'https://www.linkedin.com/in/tanner-pedretti-5559141a2/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                            </div>
                            Tanner Pedretti
                        </div>
                        <div className='v-card'>
                            <div>
                                <span><Link className='' to={{ pathname: 'https://github.com/zanehamadi' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                                <span><Link className='' to={{ pathname: 'https://www.linkedin.com/in/zane-el-abedean-hamadi-a47b1a215/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                            </div>
                            Zane Hamadi
                        </div>
                    </div>
                </div>
                <footer className='footer'>
                    <div className='footer-Content'>Psst, hey. Want to keep up with Party Lure's development? Check out our <Link className='readme-link' to={{ pathname: 'https://github.com/zanehamadi/Party-Lure#readme' }} target='true'>README</Link> here!</div>
                </footer>
            </div>
        </div>
    )
}

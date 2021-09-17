import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <div className='routeDiv'>
            <div className='aboutus'>
                <h3 className='foohfo'>Team42</h3>
                <img className='foohfoimg' alt="404 pug" src={'https://c.tenor.com/LH7fjySc35UAAAAM/monkey-cool.gif'}></img>
                <p className='top404message'>Our non-existent mmo Abyss Adventure has been around for 13 years and we at Team42 are always thinking of ways to provide you,
                    the players, with a better experience. So we went into our reef and got to brain storming and came up with an alternative way
                    of finding other players to team up with and either casually play or tackle the hardest content we have to offer.</p>
                <div className='top404message'>Meet the team:
                    <div className='top404message'>
                        <div className='cam-card'>
                            Cam Chandler
                        </div>
                        <div>
                            <Link className='' to={{ pathname: 'https://github.com/CamChandler98' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link>
                            {/* <span><Link className='gitHubLink' to={{ pathname: '' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span> */}
                        </div>
                        <div className='k-card'>
                            Kristian Martinez
                        </div>
                        <span><Link className='' to={{ pathname: 'https://github.com/Kristianmartinw' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                        <span><Link className='' to={{ pathname: 'https://www.linkedin.com/in/kristian-martinez-40137b21b/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                        <div className='tan-card'>
                            Tanner Pedreti
                        </div>
                        <span><Link className='' to={{ pathname: 'https://github.com/VoodooJellyfish' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                        <span><Link className='' to={{ pathname: 'https://www.linkedin.com/in/tanner-pedretti-5559141a2/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                        <div className='v-card'>
                            Zane Hamadi
                        </div><span><Link className='' to={{ pathname: 'https://github.com/zanehamadi' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                        <span><Link className='' to={{ pathname: 'https://www.linkedin.com/in/zane-el-abedean-hamadi-a47b1a215/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                    </div>
                </div>
                <footer className='footer'>
                    Psst, hey. Want to keep up with Party Lure's development? Check out our <Link to={{ pathname: 'https://github.com/zanehamadi/Party-Lure#readme' }} target='true'>README</Link> here!
                </footer>
            </div>
        </div>
    )
}

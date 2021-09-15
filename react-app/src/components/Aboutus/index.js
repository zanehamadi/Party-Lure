import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <>
            <div className='aboutus'>
                <h3 className='aboutheader'>Group 42</h3>
                <img className='foohfoimg' alt="404 pug" src={'https://lh3.googleusercontent.com/proxy/sVoa3VNt3UA61kOVUpGI3Bo7Z5dGcaCmyDczjG0Ad79Ug1QoC14xkLyVNmzULwA6Swp42P7GLGviUJX5lAyr1op_nqQ6WuSo2Xe4jNSWc_mmMiE_XKqbyaIovi5qq3IYZHh1'}></img>
                <p>Sometimes you make a group and expect crunch times and crud done by Thursday or Friday. Sometimes you get us instead. That's Group 42, baby.</p>
                <div>
                    <span>Cam Chandler</span><span>Kristian Martinez</span><span>Tanner Pedreti</span><span>Zane Hamadi</span>
                </div>
                <div>
                    <span><Link className='gitHubLink' to={{ pathname: 'https://github.com/CamChandler98' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                    <span><Link className='gitHubLink' to={{ pathname: 'https://www.linkedin.com/in/kristian-martinez-40137b21b/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                    <span><Link className='gitHubLink' to={{ pathname: 'https://github.com/Kristianmartinw' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                    <span><Link className='gitHubLink' to={{ pathname: 'https://www.linkedin.com/in/kristian-martinez-40137b21b/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                    <span><Link className='gitHubLink' to={{ pathname: 'https://github.com/VoodooJellyfish' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                    <span><Link className='gitHubLink' to={{ pathname: 'https://www.linkedin.com/in/tanner-pedretti-5559141a2/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                    <span><Link className='gitHubLink' to={{ pathname: 'https://github.com/zanehamadi' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/github.png'></img></Link></span>
                    <span><Link className='gitHubLink' to={{ pathname: 'https://www.linkedin.com/in/zane-el-abedean-hamadi-a47b1a215/' }} target='true'><img className='gitHubImage' alt="githubLogo" src='https://partylureawsbucket.s3.amazonaws.com/linkedin.png'></img></Link></span>
                </div>
                <footer>
                    Psst, hey. Want to keep up with Party Lure's development? Check out our <Link to={{ pathname: 'https://github.com/zanehamadi/Party-Lure#readme' }} target='true'>README</Link> here!
                </footer>
            </div>
        </>
    )
}

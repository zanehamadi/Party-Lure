import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BannerStyle = styled.div`
display: flex;
background-color: white;
position: relative;
font-size: 30px;
top:0;
width:100%;
justify-content: space-between;
min-height:50px;
align-items: center;
box-sizing: border-box;
padding: .4rem;
box-shadow: 0px 0px 2px 0px;
grid-area: banner;
background-color: #1a1c1f;

.site-name{
    margin-left: 2%;
}
.profile-pic{
    margin-right 2%;
}

.logo img{
    width: 90px;
    max-height: 90px;
    object-fit: cover
}

#topLeftLogo:hover{
    color: orange
}

#topLeftLogo{
    font-size: .8em;
}

`
const Banner = () => {
    return (
        <BannerStyle>
            <Link className='site-name' to="/" id="topLeftLogo">Party Lure 🎣</Link>
            <div className='logo'>
                <img src = 'https://partylureawsbucket.s3.amazonaws.com/Untitled42_20210919153126-removebg-preview.png' alt= 'logo'/>
            </div>
            <div className='profile-pic'>
                PIC
            </div>
        </BannerStyle>
    )
}

export default Banner

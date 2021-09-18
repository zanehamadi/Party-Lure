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
padding: .3rem;
box-shadow: 0px 0px 2px 0px;
grid-area: banner;
background-color: #1a1c1f;

.site-name{
    margin-left: 2%;
}
.profile-pic{
    margin-right 2%;
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
                LOGO
            </div>
            <div className='profile-pic'>
                PIC
            </div>
        </BannerStyle>
    )
}

export default Banner

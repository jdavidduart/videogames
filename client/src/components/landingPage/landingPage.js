import React from 'react';
import './landingPage.css'
import {Link} from 'react-router-dom';
function LandingPage() {
    return(
        <div className='landingPage'>
            <h1 className='titleLanding'>Welcome to the Game Library!</h1>
            <Link to='/home' className='link'>
                <button className='buttonLanding'>Enter Now</button>
            </Link>
            <img src='https://images5.alphacoders.com/300/300715.jpg' alt=''></img>
        </div>
    )
}

export default LandingPage;
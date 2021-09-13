import React from "react";
import Splash from "../Splash";

function Home({ sessionUser, authenticated }) {
    return (
        authenticated ?
            <>
                <h1>Welcome back, {sessionUser?.username}</h1>
            </>
            :
            <Splash />
    )
}

export default Home

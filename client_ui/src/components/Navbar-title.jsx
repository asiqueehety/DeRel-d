import React from 'react';

export default function Navbartitle({setActivePage})
{
    return(
        <div id='navbarTitle'>    
            <p onClick={() => setActivePage("home")}>DeRel'D</p>
        </div>
    )
}
import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar(props){
    const {logout}= props
    return(
        <div className= 'NavBar'>
            <Link to= './Profile'>Profile</Link>
            <Link to = './ThreadView'>Thread View</Link>
            <button onClick = {logout}>Logout</button>
        </div>
    )
}
import React from "react";


export default function Comment(props){
    const{username, body, postDate}=props
    return(
        <div className="update">
            <h1>Update</h1>
            <p>{body}</p>
            <h4>Updated by: {username} on {postDate}</h4>
        </div>
    )
}
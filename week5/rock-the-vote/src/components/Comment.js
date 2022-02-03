import React from "react";


export default function Comment(props){
    const{username, body, postDate, issues, issue}=props
    
    var Title = issues.filter(primary => issue === primary._id)
    
    return(
        <div className="comment">
            <h1>{Title[0].topic}</h1>
            <p>{body}</p>
            <h4>Posted by: {username} on {postDate}</h4>
        </div>
    )
}
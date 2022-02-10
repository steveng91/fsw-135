import React from "react";
import Comment from './Comment'

export default function CommentThread(props){
    const {comment, username,issues} = props
    return(
        <div className = 'comment'>
            {comment.map(comment => <Comment username={username} issues={issues} {...comment} key={comment._id}/>)}
        </div>
    )
} 
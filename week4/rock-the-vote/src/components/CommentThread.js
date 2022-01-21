import React from "react";
import Comment from './Comment'

export default function CommentThread(props){
    const {comment, username} = props
    return(
        <div className = 'comment'>
            {Comment.map(Comment => <Comment username={username} {...comment} key={comment._id}/>)}
        </div>
    )
}
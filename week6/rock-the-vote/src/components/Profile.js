import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'
import CommentThread from './CommentThread'
import CommentBox from './CommentBox'

export default function Profile(){
    const {user:{firstName, lastName, username},
addComment, comment, issues, getUserComments} = useContext(UserContext)

return(
    <div className='profile'>
        <h1>Hello {firstName} {lastName}, would you like to leave a comment as @{username}?</h1>
        <h2>New Comment</h2>
        <CommentBox username = {username} addComment= {addComment} issues={issues}/>
        <h2>view previous comments</h2>
        <CommentThread comment={comment} username={username} issues={issues} getUserComments= {getUserComments}/>
    </div>
)
}
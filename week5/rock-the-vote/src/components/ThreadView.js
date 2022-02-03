import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'
import CommentBox from './CommentBox'
import IssueThreads from './IssueThread'

export default function ThreadView(){
    const {selectIssue, addComment, user:{username}, comment, selectIssueThread, issues}= useContext(UserContext)

    return(
        <div className='ThreadView'>
            <h1>Select Issue Thread</h1>
            <IssueThreads            
                selectIssueThread={selectIssueThread}
                comment={comment}
                username={username}
                issues={issues}/>
            <CommentBox
                selectIssue={selectIssue}
                addComment={addComment}
                issues={issues}/>
        </div>
    )
}
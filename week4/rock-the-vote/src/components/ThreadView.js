import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider'
import CommentBox from './CommentBox'
import IssueThreads from './IssueThread'

export default function ThreadView(){
    const {selectIssue, addComment, user:{username}, comment, selectIssueThread}= useContext(UserContext)

    return(
        <div className='ThreadView'>
            <h1>Select Issue Thread</h1>
            <IssueThreads
                selectIssue={selectIssue}
                selectIssueThread={selectIssueThread}
                comment={comment}
                username={username}/>
            <CommentBox
                selectIssue={selectIssue}
                addComment={addComment}/>
        </div>
    )
}
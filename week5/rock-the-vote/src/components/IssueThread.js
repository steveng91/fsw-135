 import React, {useState} from 'react'
 import CommentThread from './CommentThread'

 const initInput = {issue: ""}

 export default function IssueThread(props){
     const [input, setInput] = useState(initInput)
     const{issues, selectIssueThread, comment, username}=props

     function handleChange(e){
         const{name, value} = e.target
         setInput(prevInput => ({
             ...prevInput,
             [name]:value
         }))
     }
     function handleSubmit(e){
         e.preventDefault()
             selectIssueThread(input)
             setInput(initInput)    
     }
     const{issue} = input
     return(
         <div>
             <form onSubmit={handleSubmit}>
                 <label for= 'issue'>Select Issue</label>
                 <select
                    name='issue'
                    value={issue}
                    onChange={handleChange}>
                    {issues.map(primary=>(<option value={primary._id}>{primary.topic}</option>))}
                </select>
                <button>View</button>
             </form>
             <CommentThread comment = {comment} username = {username} issues={issues}/>
         </div>
     )
 }
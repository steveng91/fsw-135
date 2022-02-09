 import React, {useState} from 'react'
 import CommentThread from './CommentThread'

 const initInput = {issue: ""}

 export default function IssueThread(props){
     const [input, setInput] = useState(initInput)
     const{issues, selectIssueThread, comment, username}=props

     function handleChange(e){
         const{name, value} = e.target
         console.log(name, value)
         setInput(prevInput => ({
             ...prevInput,
             [name]:value
         }))
     }
     function handleSubmit(e){
         e.preventDefault()
         console.log(input)
             selectIssueThread(input.issue)
             setInput(initInput)    
     }
    //  const{issue} = input
     return(
         <div>
             <form onSubmit={handleSubmit}>
                 <label htmlFor= 'issue'>Select Issue</label>
                 <select
                    name='issue'
                    // value={issue}
                    onChange={handleChange}>
                    {issues.map(primary=>(<option name= 'issue' key={primary._id} value={primary._id}>{primary.topic}</option>))}
                </select>
                <button>View</button>
             </form>
             <CommentThread comment = {comment} username = {username} issues={issues}/>
         </div>
     )
 }
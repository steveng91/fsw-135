 import React, {useState} from 'react'
 import CommentThread from './CommentThread'

 const initInput = {issue: ""}

 export default function IssueThread(props){
     const [input, setInput] = useState(initInput)
     const{selectIssue, selectIssueThread, comment, username}=props

     function handleChange(e){
         const{name, value} = e.target
         setInput(prevInput => ({
             ...prevInput,
             [name]:value
         }))
     }
     function handleSubmit(e){
         e.preventDefault()
             selectIssue(input)
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
                    <option value=''>Blacksmithing</option>
                    <option value=''>Bladesmithing</option>
                    <option value=''>Gunsmithing</option>
                    <option value=''>Armorer</option>
                </select>
                <button>View</button>
             </form>
             <CommentThread comment = {comment} username = {username}/>
         </div>
     )
 }
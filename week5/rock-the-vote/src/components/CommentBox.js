import React, {useState} from 'react'

const initInput = {issue: "", body: ""}

export default function CommentBox(props){
    const [input, setInput] = useState(initInput)
    const {addComment,issues} = props

    function handleChange(e){
        const{name, value}=e.target
        setInput(prevInput =>({
            ...prevInput,
            [name]: value
        }))
    }
    function handleSubmit(e){
        e.preventDefault()
        addComment(input)
        setInput(initInput)
    }
    const {issue, body}=input
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor = 'issue'>Pick an Issue</label>
             <select
             name='issue'
             value={issue}
             onChange={handleChange}>
             {issues.map(primary=>{
                 console.log(primary)
                 return(
                 <option key = {primary._id} value={primary._id}>{primary.topic}</option>)})}
         </select>
            
            <input
                type='text'
                name='body'
                value={body}
                onChange={handleChange}
                placeholder='Comment'/>
                <button>Comment</button>
        </form>
    )
}


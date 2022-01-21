import React, {useState} from 'react'

const initInput = {issue: "", body: ""}

export default function CommentBox(props){
    const [input, setInput] = useState(initInput)
    const {addComment} = props

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
            <label for = 'issue'>Select an Issue</label>
            <select
                name='issue'
                value={issue}
                onChange={handleChange}>
                    <option value="">Blacksmithing</option>
                    <option value="">Bladesmithing</option>
                    <option value="">Gunsmithing</option>
                    <option value="">Armorer</option>
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


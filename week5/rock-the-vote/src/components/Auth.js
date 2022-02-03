import React, {useState, useContext} from "react";
import NewForm from './NewForm'
import LoginForm from "./LoginForm";
import {UserContext} from '../context/UserProvider'

const initInput = {username: "", password: "", firstName: "", lastName: ""}

export default function  Auth(){
    const [input, setInput] = useState(initInput)
    const [toggle, setToggle] = useState(false)

    const {signup, login, errMsg, resetError} = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
    }
    function handleSignup(e){
        e.preventDefault()
        signup(input)
    }
    function handleLogin(e){
        e.preventDefault()
        login(input)
    }
    function toggleForm(){
        setToggle(prev=>!prev)
        resetError()
    }
    return(
        <div id = "auth-container">
            <h1>Rock The Vote</h1>
            {!toggle ?
            <>
                <NewForm
                handleChange = {handleChange}
                handleSubmit = {handleSignup}
                input = {input}
                errMsg = {errMsg}
                />
                <p onClick={() => toggleForm()}>Switch to Login</p>
            </>   
            : 
            <>
                <LoginForm
                handleChange = {handleChange}
                handleSubmit = {handleLogin}
                input = {input}
                />
                <p onClick={() => toggleForm()}> Sign Up</p>
            </> 
        }
        </div>
    )
}
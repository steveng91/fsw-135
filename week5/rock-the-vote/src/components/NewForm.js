import React from "react";

export default function LoginForm(props){
    const{handleChange, handleSubmit, errMsg, input: {username, password, firstName, lastName}} = props
    return(
        <div id="signup">
            <form onSubmit={handleSubmit} id = "New">
                <input
                type='text'
                value={firstName}
                name='firstName'
                onChange= {handleChange}
                placeholder="First Name"/>
                
                <input
                type='text'
                value={lastName}
                name='lastName'
                onChange={handleChange}
                placeholder="Last Name"/>
               
                <input
                type='text'
                value={username}
                name="username"
                onChange={handleChange}
                placeholder="Username"/>
                
                <input
                type='text'
                value={password}
                name='password'
                onChange={handleChange}
                placeholder="Password"/>
                <button>Sign Up</button>
                <p style={{backgroundColor: 'grey', color: 'black', textAlign: 'center'}}>{errMsg}</p>
            </form>
        </div>
    )
}
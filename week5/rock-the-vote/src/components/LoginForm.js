import React from 'react';

export default function LoginForm(props){
    const{handleChange, handleSubmit, errMsg, input: {username, password}}= props
    return(
        <div id='login'>
            <form onSubmit={handleSubmit} id='New'>
                <input
                type='text'
                value={username}
                name='username'
                onChange={handleChange}
                placeholder='Username'/>
                <input
                type='text'
                value={password}
                name="password"
                onChange={handleChange}
                placeholder='Password'/>
                <button>Login</button>
                <p style={{backgroundColor: 'grey', color: 'black', textAlign: 'center'}}>{errMsg}</p>
            </form> 
        </div>
    )
}
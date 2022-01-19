import React from 'react';

export default function LoginForm(props){
    const{handleChange, handleSubmit, inputs: {username, password}}= props
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
                onChange={handleChange}
                placeholder='Password'/>
                <button>Login</button>
            </form>
        </div>
    )
}
import React from 'react'
import { Navigate} from 'react-router-dom'

export default function ProtectedRoute(props){
    const{path, navigateTo, component: C, token, ...rest}=props
    return token?
    <C {...rest}/>:<Navigate replace to = {navigateTo}/>
}

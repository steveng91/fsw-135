import React, {useState} from 'react'
import axios from 'axios'

export const UserContext - React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config =>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Berrer ${token}`
    return config
})

export default function UserProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem('user'))|| {},
        token: localStorage.getItem('token')|| "",
        comment: []
    }
    const [userState, setUserState] = useState(initState)

    function signup(credentials){
        axios.post('/auth/signup', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post('/auth/login', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token',token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserComment()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function logout(){
        
    }
}
import React, {useState} from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    const initState = {user: JSON.parse( localStorage.getItem('user'))|| {},
     token: localStorage.getItem('token')|| '',
    comment: [],
    errMsg: '',
    issueComments: [],
    issues: []
    }
    const [userState, setUserState] = useState(initState)

    function handleError(errMsg){
        setUserState(prevState =>({
            ...prevState, errMsg
        }))
    }

    function resetError(){
        setUserState(prevState =>({
            ...prevState, errMsg: ''
        }))
    }

    function signup(credentials){
        axios.post('/auth/signup', credentials)
        .then(res => {
            const {user,token}=res.data
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            selectIssue()
            setUserState(prevUserState =>({
                ...prevUserState,user,token
            }))
        })
        .catch(err => handleError(err.response.data.errMsg))
    }
    function login(credentials){
        axios.post('auth/login', credentials)
        .then(res => {
            const{user,token}=res.data
            localStorage.setItem('token',token)
            localStorage.setItem('user', JSON.stringify(user))
            selectIssue()          
            setUserState(prevUserState=>({
                ...prevUserState,user,token
            }))
            getUserComments()
        })
        .catch(err => handleError(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({user: {}, token: "", comment: [], issues: [] })
    }

    function getUserComments(){
        userAxios.get('/api/comment/search/byUser')
        .then(res =>{
            setUserState(prevState=>({
                ...prevState, comment: res.data
            }))
        })
        .catch(err => handleError(err.response.data.errMsg))
    }

    function selectIssue(){
        userAxios.get('/api/issue/')
        .then(res=>{
            setUserState(prevState=>({
                ...prevState, issues: res.data
            }))
        })
        .catch(err=> handleError(err.response.data.errMsg))
    }
    const selectIssueThread =(_id)=>{
        userAxios.get(`/api/comment/search/byIssue/${_id}`)
        .then(res =>{
            setUserState(prevState=>({
                ...prevState, issueComments: res.data
            }))
        })
        .catch(err => handleError(err.response.data.errMsg))
    }
    function addComment(newComment){
        userAxios.post('/api/comment', newComment)
        .then(res =>{
            setUserState(prevState=>({
                ...prevState, comment: [...prevState.comment, res.data]
            }))
        })
        .catch(err=> handleError(err.response.data.errMsg, 'it broke here'))

    }
    
    return (
        <UserContext.Provider 
            value = {{...userState, signup, login, logout,addComment, selectIssue, selectIssueThread, getUserComments, resetError}}>
                {props.children}
        </UserContext.Provider>
        )
}
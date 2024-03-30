import { Await } from 'react-router-dom'
import { asyncStorageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    addActivity
}


async function getById(userId) {
    try{
        const user = await httpService.get(`user/${userId}`)
        return user
    }catch(err){
        console.log(err);
    }
    
    // return asyncStorageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {

    try{
      const user = await httpService.post('auth/login', {  username, password })
      console.log(user);
      return _setLoggedinUser(user)

    }catch(err){
        console.log(err);
    }
   
   
     
    // return asyncStorageService.query(STORAGE_KEY)
    //     .then(users => {
    //         const user = users.find(user => user.username === username)
    //         // if (user && user.password !== password) return _setLoggedinUser(user)
    //         if (user) return _setLoggedinUser(user)
    //         else return Promise.reject('Invalid login')
    //     })
}

async function signup(newUser) {
    try{
        const user = await httpService.post('auth/signup', { newUser })
        return _setLoggedinUser(user)
    }catch(err){
        console.log(err)
    }
     
 

    // const userToAdd = getEmptyCredentials()
    // const user = { ...userToAdd,...newUser}
    // return asyncStorageService.post(STORAGE_KEY, user)
    //     .then(_setLoggedinUser)
}

async function logout() {
    try{
       await httpService.post('auth/logout')
       sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN) 
    }catch(err){
        console.log(err);
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname,isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

async function addActivity(type, todoId) {
    // const activity = {
    //     txt: `${type} a Todo with id : ${todoId}`,
    //     at: Date.now()
    // }
    // const loggedinUser = getLoggedinUser()
    // if (!loggedinUser) return

    // try{
    //     const user = await getById(loggedinUser._id)
    //     if (!user.activities) user.activities = []
    //         user.activities.unshift(activity)
    //     try{
    //         const userToUpdate = httpService.put('auth/logout')
    //     }
    // }catch(err){
    //     console.log(err);
    // }
    
    
    //     .then(user => {
    //         if (!user.activities) user.activities = []
    //         user.activities.unshift(activity)
    //         return user
    //     })
    //     .then(userToUpdate => {
    //         return storageService.put(STORAGE_KEY, userToUpdate)
    //             .then((savedUser) => {
    //                 _setLoggedinUser(savedUser)
    //                 return savedUser
    //             })
    //     })
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        activities:[],
    }
}

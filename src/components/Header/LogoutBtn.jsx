import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

//We'll conditionally render logout in our Header --> we'll check if user is logged in(if authStatus is true)
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout() //actual logging out.
        .then(() => { 
            dispatch(logout()) //updating the state after logging out.
        })
    }
    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
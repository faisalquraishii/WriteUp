//we're building a mechanism to protect our routes

//used in main.jsx
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } 
        /*
        If authentication is true, meaning the route requires authentication, and the 
        authStatus is false (indicating the user is not authenticated), the user is redirected 
        to the login page. */
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        /*If authentication is false, meaning the route is public and does not require authentication, 
        and the authStatus is true (indicating the user is authenticated), the user is redirected to 
        the home page. */

        //In both cases, if the conditions are not met, the user remains on the current page.

        setLoader(false)// Once the redirection logic is executed, the loader state is set to false, 
        //allowing the child components to be rendered.

    }, [authStatus, navigate, authentication])
    /*The logic in the useEffect hook ensures that the user is redirected to the 
    appropriate route based on the authentication status. */


  return loader ? <h1>Loading...</h1> : <>{children}</> //conditional rendering
}

/* By introducing the authentication variable, the Protected component becomes more flexible. 
It allows the component to be reused for both authenticated and unauthenticated routes. 
Sometimes, there might be routes that are meant to be accessed only when the user is not 
authenticated (e.g., login or signup pages), while others are accessible only when the user 
is authenticated. By having the authentication variable, you can easily specify the authentication 
requirement for each protected route.
*/


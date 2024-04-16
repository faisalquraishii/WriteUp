import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

//it's the App component's rendering that triggers the useEffect hook.
function App() {
  const [loading, setLoading] = useState(true)//make it true initially
  /*loading states are commonly used to indicate to the user that something is happening behind the 
  scenes, such as fetching data from a server or performing some processing tasks.
  Setting loading to true initially allows you to show a loading indicator or spinner to the user 
  while the app is fetching data from the Appwrite server or performing some initialization tasks.  */

  const dispatch = useDispatch() //dispatch makes changes in Store using Reducer

  //When the app loads, asks the user if he is logged in or not
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) { //is true --> i.e. user is logged in
        dispatch(login({userData})) //--> update the state
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false)) //finally run hota hi hota hai
  }, []) //In this case, it runs once when the component mounts (due to the empty dependency array []).
  //the callback function is "called back" by useEffect when the component mounts.
  
  //conditional rendering
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

  //The Header and Footer components are displayed consistently across different pages.

  /*In essence, <Outlet /> acts as a placeholder where the content of the matched 
  route is rendered within the layout of your application. This allows you to define a consistent 
  layout structure while still rendering different content based on the current URL..*/
}

export default App
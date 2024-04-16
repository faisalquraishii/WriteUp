import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}> {/*authentication = {true}/{false} just indicates 
                whether the route requires authentication or not.  */}
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
        <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>, /*By passing the store to the <Provider>, it ensures that 
  //all components wrapped by the <Provider> have access to the Redux store. */
)

/*This file sets up the structure of your application’s navigation. */

/*COMMUNICATION FLOW
--> When a user accesses your application, the main.jsx route configuration is loaded first.

--> The router defined in main.jsx determines which component should be rendered based on the URL path.

--> If the user navigates to a specific route(e.g., /login), the corresponding component (e.g., <Login />) 
is rendered within the <Outlet /> in App.jsx.

*/

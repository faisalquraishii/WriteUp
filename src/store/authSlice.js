/*In Redux Toolkit, a "slice" refers to a portion of your application state and the logic to update 
that portion of the state. Slices are typically defined for specific areas of your application's state 
tree, making it easier to manage state updates and actions related to a specific feature or 
domain within your application */


// Tracking user authentication
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions; //object destructuring

export default authSlice.reducer;

/*though we did most of our work in appwrite but we will use REDUX for store. Our store should at least 
know if the user is logged-in or logged-out. */


import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
/*//In Redux Toolkit, a store is a JavaScript object that holds the complete state tree of your 
application. */
const store = configureStore({
    reducer: {
        auth : authSlice,
        //TODO: add more slices here for posts
    }
});

export default store;
/*When you use 'export default' in a module to 
export something, you can import it using any name you want in another module. */


/*store needs knowledge of the reducer. Store is restrictive. It does not allow 
anyone to update the values*/
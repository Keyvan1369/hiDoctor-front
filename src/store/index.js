import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/auth.slice.js";




const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})


export default store;

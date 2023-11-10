import {createSlice} from "@reduxjs/toolkit";

export const Roles = {
    PATIENT: "patient",
    DOCTOR: "doctor"
}


function getInitialState() {
    try {
        const authStr = localStorage.getItem('user')
        const user = JSON.parse(authStr);
        if (user)
            return {
                isAuthenticated: true,
                role: user.role,
                username: user.username,
                fullName: user.fullName
            };
        else throw new Error()
    } catch (err) {
        return {
            isAuthenticated: false,
            role: undefined,
            username: undefined,
            fullName: undefined
        }

    }
}

const slice = createSlice({
    name: "auth",
    initialState: getInitialState(),
    reducers: {
        loginStore(state, action) {
            state.isAuthenticated = true;
            state.role = action.payload.user.role;
            state.username = action.payload.user.username
            state.fullName = action.payload.user.fullName
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },
        logout(state) {
            state.isAuthenticated = false;
            state.role = undefined;
            state.username = undefined;
            state.fullName = undefined;
            localStorage.clear();
        },
    }
})

export default slice

export const {loginStore, logout} = slice.actions

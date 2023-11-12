import React, {useState} from 'react';
import style from './login.module.scss'
import Header from "../../components/header/header.jsx";
import {Button, TextField} from "@mui/material";
import {AuthApi} from "../../api/authApi.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {loginStore} from "../../store/slice/auth.slice.js";
import api from "../../api/api.js";

const Login = () => {

    const dispatch = useDispatch()
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const handleChangeUsername = (e) => {
        form.username = e.target.value;
        setForm({...form})
    }
    const handleChangePassword = (e) => {
        form.password = e.target.value;
        setForm({...form})
    }

    function handleSubmit() {
        AuthApi.login(form.username, form.password)
            .then(res => {
                toast.success("sign in successfully")
                api.defaults.headers.token = res.data.token
                dispatch(loginStore(res.data))
            }).catch(err => {
            toast.error(err.message)
        })
    }

    return (
        <div className={style.login}>
            <Header/>
            <div className={style.content}>
                <div className={style.textContainer}>
                    <div className={style.box}>
                        <h3>Welcome, Log in now!</h3>
                        <TextField value={form.username} onChange={handleChangeUsername} label="Username"
                                   placeholder="enter username"/>
                        <TextField value={form.password} onChange={handleChangePassword} label="Password"
                                   type="password" placeholder="enter username"/>
                        <Button disabled={!form.username || !form.password} onClick={handleSubmit}
                                variant="contained">Login</Button>
                    </div>
                </div>
                <div className={style.cover}/>
            </div>
        </div>
    );
};

export default Login;

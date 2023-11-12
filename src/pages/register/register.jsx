import React, {useMemo, useState} from 'react';
import style from './register.module.scss'
import Header from "../../components/header/header.jsx";
import {Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {AuthApi} from "../../api/authApi.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const ROLES = {
    PATIENT: "patient",
    DOCTOR: "doctor"
}

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        fullName: "",
        role: ROLES.PATIENT
    })

    const handleChangeUsername = (e) => {
        form.username = e.target.value;
        setForm({...form})
    }
    const handleChangePassword = (e) => {
        form.password = e.target.value;
        setForm({...form})
    }
    const handleChangeFullName = (e) => {
        form.fullName = e.target.value;
        setForm({...form})
    }
    const handleChangeRole = (role) => {
        form.role = role;
        setForm({...form})
    }

    function handleSubmit() {
        AuthApi.register(form)
            .then(res => {
                toast.success("sign up successfully")
                navigate("/login")
            }).catch(err => {
            toast.error(err.message)
        })
    }

    const formIsValid = useMemo(() => {
        return form.fullName && form.username && form.password && form.role
    }, [form])

    return (
        <div className={style.register}>
            <Header/>
            <div className={style.content}>
                <div className={style.textContainer}>
                    <div className={style.box}>
                        <h3>Welcome, Create a Account!</h3>
                        <TextField value={form.fullName} onChange={handleChangeFullName} label="FullName"
                                   placeholder="enter fullName"/>
                        <TextField value={form.username} onChange={handleChangeUsername} label="Username"
                                   placeholder="enter username"/>
                        <TextField value={form.password} onChange={handleChangePassword} label="Password"
                                   type="password" placeholder="enter password"/>
                        <FormControl>
                            <RadioGroup row value={form.role} onChange={(e, value) => handleChangeRole((value))}>
                                <FormControlLabel value="patient" control={<Radio/>} label="Patient"/>
                                <FormControlLabel value="doctor" control={<Radio/>} label="Doctor"/>
                            </RadioGroup>
                        </FormControl>
                        <Button disabled={!formIsValid} onClick={handleSubmit}
                                variant="contained">Register</Button>
                    </div>
                </div>
                <div className={style.cover}/>
            </div>
        </div>
    );
};

export default Register;

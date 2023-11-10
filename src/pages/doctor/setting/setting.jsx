import React, {useEffect, useState} from 'react';
import Card from "../../../components/card/card.jsx";
import style from './setting.module.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {ExpertiseApi} from "../../../api/expertiseApi.js";
import {toast} from "react-toastify";
import {Button, TextField} from "@mui/material";
import InputTime from "../../../components/inputTime/inputTime.jsx";
import {AuthApi} from "../../../api/authApi.js";

const Setting = () => {

    const [expertiseList, setExpertiseList] = useState([])
    const [form, setForm] = useState({
        expertise: "",
        appointmentTime: "",
        dayStartTime: "",
        dayEndTime: "",
    })

    useEffect(() => {
        ExpertiseApi.getAll().then(res => {
            setExpertiseList(res.data)
        }).catch(err => toast.error(err))
    }, [])

    function handleChangeForm(value, name) {
        form[name] = value;
        setForm({...form})
    }

    function handleSave() {
        AuthApi.updateSetting(form)
            .then(res => {
                toast.success("settings updated")
            }).catch(err => toast.error(err))
    }

    return (
        <div className={style.container}>
            <Card title="Settings">
                <p className={style.hint}>please enter some required fields about yourself</p>
                <div className={style.card}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Expertise</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={form.expertise}
                            label="Expertise"
                            onChange={(e,) => handleChangeForm(e.target.value, "expertise")}
                        >
                            {expertiseList.map(item =>
                                <MenuItem value={item._id}>{item.title}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField placeholder="Appointment Time (min)" label="Appointment Time (min)"
                               value={form.appointmentTime} type="number"
                               onChange={(e) => handleChangeForm(e.target.value, "appointmentTime")}/>
                    <div className={style.inputTimeContainer}>
                        <label>
                            Day Start Time
                        </label>
                        <InputTime value={form.dayStartTime}
                                   setValue={value => handleChangeForm(value, "dayStartTime")}/>
                    </div>
                    <div className={style.inputTimeContainer}>
                        <label>
                            Day End Time
                        </label>
                        <InputTime value={form.dayEndTime} setValue={value => handleChangeForm(value, "dayEndTime")}/>
                    </div>
                </div>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </Card>
        </div>
    );
};

export default Setting;

import React, {useEffect, useMemo, useState} from 'react';
import Card from "../../../components/card/card.jsx";
import style from './plan.module.scss'
import {Button, ButtonBase, IconButton} from "@mui/material";
import {ChevronLeft, ChevronRight, Close} from "@mui/icons-material";
import moment from "moment";
import {AuthApi} from "../../../api/authApi.js";
import {toast} from "react-toastify";
import {AppointmentTimeApi} from "../../../api/appointmentTimeApi.js";
import {momentDateToNumber, numberDateToMoment} from "../../../utils/date.utils.js";
import {Link} from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const Plan = () => {

    const [date, setDate] = useState(moment())
    const [loading, setLoading] = useState(true)
    const [settings, setSettings] = useState()
    const [appointmentTimes, setAppointmentTimes] = useState([])

    useEffect(() => {
        AuthApi.getProfile().then(res => {
            if (res.data.setting)
                setSettings(res.data.setting)
        }).catch(err => toast.error(err.message))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        AppointmentTimeApi.getAll(momentDateToNumber(date,"day")).then(res => {
            setAppointmentTimes(res.data)
        }).catch(err => toast.error(err.message))
    }, [date])

    function syncWithServer(times) {
        AppointmentTimeApi.create(momentDateToNumber(date,"day"), times)
            .then(res => {
                setAppointmentTimes(res.data)
            }).catch(err => toast.error(err.message))
    }

    const times = useMemo(() => {
        if (!settings)
            return []
        const times = [];
        const {appointmentTime, dayStartTime, dayEndTime} = settings

        const startTime = moment(date).set({
            hour: dayStartTime.split(":")[0],
            minute: dayStartTime.split(":")[1],
            second: 0,
            millisecond: 0
        })
        const endTime = moment(date).set({
            hour: dayEndTime.split(":")[0],
            minute: dayEndTime.split(":")[1],
            second: 0,
            millisecond: 0
        })
        let diff = Math.abs(startTime.diff(endTime, "minute"))
        let startTimeNumber = momentDateToNumber(startTime, "min")
        let endTimeNumber = momentDateToNumber(endTime, "min")
        while (diff > 0) {
            times.push({
                date: momentDateToNumber(date, "day"),
                from: startTimeNumber,
                to: Math.min(startTimeNumber + appointmentTime * 60, endTimeNumber)
            })
            startTimeNumber += appointmentTime * 60
            diff -= appointmentTime
        }
        return times;
    }, [date, settings])

    function handlePrevDate() {
        setDate(date => moment(date).subtract(1, "day"))
    }

    function handleNextDate() {
        setDate(date => moment(date).add(1, "day"))
    }

    function handleSelectTime(time) {
        const foundTimeIndex = appointmentTimes.findIndex(item => item.from === time.from)
        if (foundTimeIndex !== -1)
            appointmentTimes.splice(foundTimeIndex, 1)
        else appointmentTimes.push(time)
        setAppointmentTimes([...appointmentTimes]);
        syncWithServer(appointmentTimes);
    }

    function isTimeSelected(time) {
        const foundTimeIndex = appointmentTimes.findIndex(item => item.from === time.from)
        return foundTimeIndex !== -1;
    }

    function handleSelectAll() {
        setAppointmentTimes(times)
        syncWithServer(times)
    }

    function handleDeselectAll() {
        setAppointmentTimes([])
        syncWithServer([])
    }

    return (
        <div className={style.container}>
            <Card title="Plan" description="plan your next days appointments">
                <div className={style.card}>
                    <header className={style.header}>
                        <IconButton onClick={handlePrevDate}><ChevronLeft/></IconButton>
                        <div className={style.date}>
                            <span>{date.format("dddd")}</span>
                            <span>{date.format("D MMM")}</span>
                        </div>
                        <IconButton onClick={handleNextDate}><ChevronRight/></IconButton>
                    </header>
                    <main className={style.content}>
                        <header className={style.actions}>
                            <Button onClick={handleSelectAll} startIcon={<LibraryAddCheckIcon/>} size="small">Select
                                All</Button>
                            {appointmentTimes.length > 0 &&
                                <Button onClick={handleDeselectAll} startIcon={<Close/>} size="small">Remove All
                                    Selects</Button>}
                        </header>
                        <div className={style.times}>

                            {times.map(item => <ButtonBase key={item.from} className={style.timeCard}
                                                           onClick={e => handleSelectTime(item)}>
                                <span
                                    className={style.timeCardFrom}>{numberDateToMoment(item.from).format("HH:mm")}</span>
                                {isTimeSelected(item) ? <CheckCircleIcon className={style.timeCardCheck}/> :
                                    <CheckCircleOutlineIcon className={style.timeCardCheckBorder}/>}
                            </ButtonBase>)}
                        </div>
                    </main>
                </div>
                {!settings?.active && !loading &&
                    <div className={style.alert}>
                        <p>You must complete your setting to able plan your times</p>
                        <Link to="/doctor/setting">Go To Settings</Link>
                    </div>}
            </Card>
        </div>
    );
};

export default Plan;

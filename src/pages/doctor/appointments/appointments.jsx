import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { Button, ButtonBase, IconButton, Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppointmentTimeApi } from "../../../api/appointmentTimeApi.js";
import { AuthApi } from "../../../api/authApi.js";
import Card from "../../../components/card/card.jsx";
import {
  momentDateToNumber,
  numberDateToMoment,
} from "../../../utils/date.utils.js";
import style from "./appointments.module.scss";
import { AppointmentApi } from "../../../api/appointmentApi.js";
import Person3Icon from "@mui/icons-material/Person3";

const Appointments = () => {
  const [date, setDate] = useState(moment());
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    AuthApi.getProfile()
      .then((res) => {
        if (res.data.setting) setSettings(res.data.setting);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    AppointmentApi.get(momentDateToNumber(date, "day"))
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, [date]);

  const times = useMemo(() => {
    if (!settings) return [];
    const times = [];
    const { appointmentTime, dayStartTime, dayEndTime } = settings;

    const startTime = moment(date).set({
      hour: dayStartTime.split(":")[0],
      minute: dayStartTime.split(":")[1],
      second: 0,
      millisecond: 0,
    });
    const endTime = moment(date).set({
      hour: dayEndTime.split(":")[0],
      minute: dayEndTime.split(":")[1],
      second: 0,
      millisecond: 0,
    });
    let diff = Math.abs(startTime.diff(endTime, "minute"));
    let startTimeNumber = momentDateToNumber(startTime, "min");
    let endTimeNumber = momentDateToNumber(endTime, "min");
    while (diff > 0) {
      const to = Math.min(
        startTimeNumber + appointmentTime * 60,
        endTimeNumber
      );
      times.push({
        date: momentDateToNumber(date, "day"),
        from: startTimeNumber,
        to,
        appointment: appointments.find(
          (item) => item.from === startTimeNumber && item.to === to
        ),
      });
      startTimeNumber += appointmentTime * 60;
      diff -= appointmentTime;
    }
    return times;
  }, [date, settings, appointments]);

  function handlePrevDate() {
    setDate((date) => moment(date).subtract(1, "day"));
  }

  function handleNextDate() {
    setDate((date) => moment(date).add(1, "day"));
  }

  return (
    <div className={style.container}>
      <Card title="Appointments" description="appointment list">
        <div className={style.card}>
          <header className={style.header}>
            <IconButton onClick={handlePrevDate}>
              <ChevronLeft />
            </IconButton>
            <div className={style.date}>
              <span>{date.format("dddd")}</span>
              <span>{date.format("D MMM")}</span>
            </div>
            <IconButton onClick={handleNextDate}>
              <ChevronRight />
            </IconButton>
          </header>
          <main className={style.content}>
            <div className={style.times}>
              {times.map((item) => (
                <ButtonBase key={item.from} className={style.timeCard}>
                  <span className={style.timeCardFrom}>
                    {numberDateToMoment(item.from).format("HH:mm")}
                  </span>
                  {item.appointment && (
                    <Tooltip title={item.appointment.patient.fullName + " reserve this time"}>
                    <Person3Icon className={style.timeCardCheck} />
                    </Tooltip>
                  )}
                </ButtonBase>
              ))}
            </div>
          </main>
        </div>
        {!settings?.active && !loading && (
          <div className={style.alert}>
            <p>You must complete your setting to able view your appointments</p>
            <Link to="/doctor/setting">Go To Settings</Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Appointments;

import { AccountCircle, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, LinearProgress } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PatientApi } from "../../../api/patientApi.js";
import Card from "../../../components/card/card.jsx";
import {
  momentDateToNumber,
  numberDateToMoment,
} from "../../../utils/date.utils.js";
import style from "./patientAppointments.module.scss";

const PatientAppointments = () => {
  const [date, setDate] = useState(moment());
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setLoading(true);
    PatientApi.getAppointments(momentDateToNumber(date, "day"))
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [date]);

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
              {loading ? (
                <LinearProgress></LinearProgress>
              ) : appointments.length === 0 ? (
                <p>No Appointments exists</p>
              ) : (
                appointments.map((item) => (
                  <div key={item._id} className={style.timeCard}>
                    <AccountCircle className={style.doctorIcon}></AccountCircle>
                    <div className={style.timeCardContent}>
                      <span className={style.doctor}>
                        Doctor : {item.doctor.fullName}
                      </span>
                      <span className={style.fromTo}>
                        From : {numberDateToMoment(item.from).format("HH:mm")}
                      </span>
                      <span className={style.fromTo}>
                        To : {numberDateToMoment(item.to).format("HH:mm")}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </Card>
    </div>
  );
};

export default PatientAppointments;

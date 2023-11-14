import { useEffect, useMemo, useState } from "react";
import style from "./reserve.module.scss";
import { PatientApi } from "../../../api/patientApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, ButtonBase, LinearProgress } from "@mui/material";
import Map from "../searchResult/components/map";
import Card from "../../../components/card/card";
import moment from "moment/moment";
import {
  momentDateToNumber,
  numberDateToMoment,
} from "../../../utils/date.utils";
import { AppointmentApi } from "../../../api/appointmentApi";

const Reserve = () => {
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);
  const { doctor: doctorId } = useParams();
  const [date, setDate] = useState(moment());
  const [times, setTimes] = useState([]);
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {
    PatientApi.getDoctorById(doctorId)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    PatientApi.getDoctorTimes(doctorId, momentDateToNumber(date, "day"))
      .then((res) => {
        setTimes(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, [date, doctorId]);

  const days = useMemo(() => {
    const today = moment();
    const days = [];
    for (let index = 0; index < 10; index++) {
      days.push(moment(today));
      today.add(1, "day");
    }
    return days;
  }, []);

  const selectedTimeLabel = useMemo(
    () =>
      selectedTime &&
      numberDateToMoment(selectedTime?.date).format("D MMMM") +
        " " +
        numberDateToMoment(selectedTime?.from).format("HH:mm"),
    [selectedTime]
  );

  function handleSelectDate(date) {
    setDate(date);
  }

  function handleSelectTime(time) {
    setSelectedTime(time);
  }

  function handleReserve() {
    AppointmentApi.create({
      time: selectedTime._id,
      from: selectedTime.from,
      to: selectedTime.to,
      date: selectedTime.date,
      doctor: doctorId,
    })
      .then((res) => {
        toast.success("appointment successfully saved");
        navigate(-1);
      })
      .catch((err) => toast.error(err.message));
  }

  if (loading) return <LinearProgress></LinearProgress>;
  if (!doctor)
    return (
      <div>
        <p>Some error to load detail...</p>
      </div>
    );

  const {
    fullName,
    username,
    setting: { expertise, ...setting },
  } = doctor;

  return (
    <Card className={style.reserve}>
      <header className={style.header}>
        <div>
          <h1>Doctor {fullName}</h1>
          <p>Username : {username}</p>
          <p>Expertise : {expertise?.title}</p>
          <p>
            Work Time : {setting?.dayStartTime}-{setting.dayEndTime}
          </p>
        </div>
        <Map
          doctors={[doctor]}
          zoom={14}
          center={doctor.setting.location}
          className={style.mapBox}
        />
      </header>
      <main>
        <header className={style.timeHeader}>
          <h3>Doctor Times :</h3>
          <Button
            disabled={!selectedTime}
            onClick={handleReserve}
            size="small"
            variant="contained"
          >
            Reserve - {selectedTimeLabel}
          </Button>
        </header>
        <div className={style.content}>
          <div className={style.days}>
            {days.map((day) => (
              <ButtonBase
                onClick={() => handleSelectDate(day)}
                className={`${style.dayCard} ${
                  day.format("D") === date.format("D") && style.active
                }`}
                key={day.valueOf()}
              >
                <span>{day.format("D")}</span>
                <span>{day.format("dddd")}</span>
              </ButtonBase>
            ))}
          </div>
          <div className={style.times}>
            {times.length === 0 && <p>No Time exists!</p>}
            {times.map((item) => (
              <ButtonBase
                onClick={() => handleSelectTime(item)}
                key={item.from}
                disabled={!item.free}
                className={`${style.timeCard} ${
                  item._id === selectedTime?._id && style.active
                } ${!item.free && style.forbidden}`}
              >
                <span className={style.timeCardFrom}>
                  {numberDateToMoment(item.from).format("HH:mm")}
                </span>
                {/* {isTimeSelected(item) ? (
                  <CheckCircleIcon className={style.timeCardCheck} />
                ) : (
                  <CheckCircleOutlineIcon
                    className={style.timeCardCheckBorder}
                  />
                )} */}
              </ButtonBase>
            ))}
          </div>
        </div>
      </main>
    </Card>
  );
};

export default Reserve;

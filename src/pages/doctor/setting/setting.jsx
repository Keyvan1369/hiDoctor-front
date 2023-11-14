import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthApi } from "../../../api/authApi.js";
import { ExpertiseApi } from "../../../api/expertiseApi.js";
import Card from "../../../components/card/card.jsx";
import InputTime from "../../../components/inputTime/inputTime.jsx";
import SelectFromMap from "./selectFromMap/selectFromMap.jsx";
import style from "./setting.module.scss";

const Setting = () => {
  const [expertiseList, setExpertiseList] = useState([]);
  const [form, setForm] = useState({
    expertise: "",
    appointmentTime: "",
    dayStartTime: "",
    dayEndTime: "",
    location : undefined
  });
  const [disableChange, setDisableChange] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    ExpertiseApi.getAll()
      .then((res) => {
        setExpertiseList(res.data);
      })
      .catch((err) => toast.error(err.message));
    AuthApi.getProfile()
      .then((res) => {
        if (res.data.setting) {
          setForm({
            expertise: res.data.setting.expertise,
            appointmentTime: res.data.setting.appointmentTime,
            dayStartTime: res.data.setting.dayStartTime,
            dayEndTime: res.data.setting.dayEndTime,
            location: res.data.setting.location,
          });
          setDisableChange(true);
          res.data.setting?.location && mapRef.current.flyTo(res.data.setting?.location)
        }
      })
      .catch((err) => toast.error(err.message));
  }, []);

  function handleChangeForm(value, name) {
    form[name] = value;
    setForm({ ...form });
  }

  function handleSave() {
    AuthApi.updateSetting({...form,location : mapRef.current.getCenter()})
      .then(() => {
        toast.success("settings updated");
      })
      .catch((err) => toast.error(err.message));
  }


  return (
    <div className={style.container}>
      <Card
        title="Settings"
        description="please enter some required fields about yourself"
      >
        <div className={style.card}>
          <FormControl fullWidth>
            <InputLabel>Expertise</InputLabel>
            <Select
              value={form.expertise}
              label="Expertise"
              onChange={(e) => handleChangeForm(e.target.value, "expertise")}
            >
              {expertiseList.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            placeholder="Appointment Time (min)"
            label="Appointment Time (min)"
            value={form.appointmentTime}
            disabled={disableChange}
            type="number"
            onChange={(e) =>
              handleChangeForm(e.target.value, "appointmentTime")
            }
          />
          <div className={style.inputTimeContainer}>
            <label>Day Start Time</label>
            <InputTime
              value={form.dayStartTime}
              disabled={disableChange}
              setValue={(value) => handleChangeForm(value, "dayStartTime")}
            />
          </div>
          <div className={style.inputTimeContainer}>
            <label>Day End Time</label>
            <InputTime
              disabled={disableChange}
              value={form.dayEndTime}
              setValue={(value) => handleChangeForm(value, "dayEndTime")}
            />
          </div>
          <div className={style.map}>
            <label>Location</label>
            <SelectFromMap ref={mapRef} center={form?.location} />
          </div>
        </div>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Card>
    </div>
  );
};

export default Setting;

import { useEffect, useMemo, useState } from "react";
import SearchBox from "../../../components/searchBox/searchBox";
import style from "./searchResult.module.scss";
import { Button } from "@mui/material";
import { AccountCircle, Map } from "@mui/icons-material";
import Card from "../../../components/card/card";
import { useLocation } from "react-router-dom";
import { PatientApi } from "../../../api/patientApi";
import { toast } from "react-toastify";

const SearchResult = () => {
  const [inputValue, setInputValue] = useState("");
  const { search } = useLocation();
  const [doctors, setDoctors] = useState([]);

  const searchExpertiseValue = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get("expertise");
  }, [search]);

  useEffect(() => {
    if (searchExpertiseValue)
      PatientApi.searchDoctors(searchExpertiseValue)
        .then((res) => {
          setDoctors(res.data);
        })
        .catch((err) => toast.error(err.message));
    else setDoctors([]);
  }, [searchExpertiseValue]);

  return (
    <div className={style.container}>
      <SearchBox
        className={style.search}
        value={inputValue}
        onChangeValue={(value) => setInputValue(value)}
      />
      <Card
        title="Search Result"
        className={style.card}
        action={<Button startIcon={<Map />}>Toggle Map View</Button>}
      >
        <div className={style.doctors}>
          {doctors.map((item) => (
            <div className={style.doctorItem} key={item._id}>
              <AccountCircle className={style.doctorIcon} />
              <span className={style.fullName}>{item.fullName}</span>
              <span className={style.expertise}>{item.setting.expertise?.title} | {item.setting.dayStartTime}-{item.setting.dayEndTime}</span>
              <Button className={style.reserveBtn} color="error" size="small" variant="outlined">Reserve</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SearchResult;

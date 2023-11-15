import { useEffect, useMemo, useState } from "react";
import SearchBox from "../../../components/searchBox/searchBox";
import style from "./searchResult.module.scss";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import { AccountCircle, MapSharp } from "@mui/icons-material";
import Card from "../../../components/card/card";
import { useLocation, useNavigate } from "react-router-dom";
import { PatientApi } from "../../../api/patientApi";
import { toast } from "react-toastify";
import Map from "./components/map";

const SearchResult = () => {
  const [inputValue, setInputValue] = useState("");
  const { search } = useLocation();
  const [doctors, setDoctors] = useState([]);
  const [mode, setMode] = useState("list");
  const navigate = useNavigate();
  const mobileSize = useMediaQuery("(max-width:600px)");
  const { searchExpertiseValue, expertiseTitle } = useMemo(() => {
    const params = new URLSearchParams(search);
    return {
      searchExpertiseValue: params.get("expertise"),
      expertiseTitle: params.get("name"),
    };
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

  function renderContent() {
    if (mode === "list")
      return (
        <div className={style.doctors}>
          {doctors.map((item) => (
            <div className={style.doctorItem} key={item._id}>
              <AccountCircle className={style.doctorIcon} />
              <span className={style.fullName}>{item.fullName}</span>
              <span className={style.expertise}>
                {item.setting.expertise?.title} | {item.setting.dayStartTime}-
                {item.setting.dayEndTime}
              </span>
              <Button
                className={style.reserveBtn}
                color="error"
                size="small"
                variant="outlined"
                onClick={() => navigate(`/patient/reserve/${item._id}`)}
              >
                Reserve
              </Button>
            </div>
          ))}
        </div>
      );
    else return <Map doctors={doctors} />;
  }

  return (
    <div className={style.container}>
      <SearchBox
        className={style.search}
        value={inputValue}
        onChangeValue={(value) => setInputValue(value)}
      />
      <Card
        title={`Search Result ${expertiseTitle && "- " + expertiseTitle}`}
        className={style.card}
        action={
          mobileSize ? (
            <IconButton
              onClick={() => setMode(mode === "list" ? "map" : "list")}
            >
              <MapSharp/>
            </IconButton>
          ) : (
            <Button
              className={style.modeBtn}
              onClick={() => setMode(mode === "list" ? "map" : "list")}
              startIcon={<Map />}
              size="small"
            >
              {mode === "list" ? "Toggle Map View" : "Toggle List View"}
            </Button>
          )
        }
      >
        {renderContent()}
      </Card>
    </div>
  );
};

export default SearchResult;

/* eslint-disable react/prop-types */
import {
  HealthAndSafety,
  MedicalServices,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "../../utils/useDebounce";
import style from "./searchBox.module.scss";
import { PatientApi } from "../../api/patientApi";
import { Link } from "react-router-dom";

const SearchBox = ({ value, onChangeValue, className }) => {
  const [result, setResult] = useState({
    doctors: [],
    expertiseList: [],
  });
  const [open, setOpen] = useState(false);
  const searchValue = useDebounce(value, 1000);
  const ignoreChange = useRef(false);

  useEffect(() => {
    if (!value) setResult({ doctors: [], expertiseList: [] });
  }, [value]);

  useEffect(() => {
    if (searchValue && !ignoreChange.current) {
      PatientApi.search(searchValue, 5)
        .then((res) => {
          setOpen(true);
          setResult(res.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else ignoreChange.current = false;
  }, [searchValue]);

  console.log(ignoreChange.current);

  const hasAnyResult = useMemo(
    () => result.doctors.length > 0 || result.expertiseList.length > 0,
    [result]
  );

  const handleExpertiseClick = (expertise) => {
    setOpen(false);
    ignoreChange.current = true;
    onChangeValue(expertise.title);
  };

  return (
    <div
      className={`${style.inputContainer} ${
        hasAnyResult && open && style.hasResult
      } ${className}`}
    >
      <SearchIcon className={style.searchIcon} />
      <input
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        className={style.input}
        type="text"
        placeholder="search doctor name or any expertise..."
      />
      {hasAnyResult && open && (
        <div className={style.completion}>
          {result.doctors.length > 0 && (
            <>
              <header>Doctors</header>
              <ul>
                {result.doctors.map((item) => (
                  <li key={item._id}>
                    <Link
                      onClick={() => setOpen(false)}
                      to={`/patient/reserve/${item._id}`}
                    >
                      <HealthAndSafety />
                      <strong>{item.username}</strong>
                       {item.fullName}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {result.expertiseList.length > 0 && (
            <>
              <header>Expertise</header>
              <ul>
                {result.expertiseList.map((item) => (
                  <li key={item._id}>
                    <Link
                      onClick={() => handleExpertiseClick(item)}
                      to={`/patient/result?expertise=${item._id}&name=${item.title}`}
                    >
                      <MedicalServices />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;

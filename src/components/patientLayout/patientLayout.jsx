import Header from "../header/header.jsx";
import style from "./patientLayout.module.scss";
import {Outlet} from "react-router-dom";

const PatientLayout = () => {
    return (
        <div className={style.patient}>
            <Header/>
            <div className={style.container}>
                <div className={style.content}>
                    <Outlet/>
                </div>
                <div className={style.cover}/>
            </div>
        </div>
    );
};

export default PatientLayout;

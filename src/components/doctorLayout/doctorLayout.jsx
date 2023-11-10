import React from 'react';
import Header from "../header/header.jsx";
import style from "./doctorLayout.module.scss";
import {Outlet} from "react-router-dom";

const DoctorLayout = () => {
    return (
        <div className={style.doctor}>
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

export default DoctorLayout;

import React from 'react';
import style from './home.module.scss'
import Header from "../../components/header/header.jsx";

const Home = () => {
    return (
        <div className={style.home}>
            <Header/>
            <div className={style.content}>
                <div className={style.textContainer}>
                    <h1>Hi Doctor</h1>
                    <p className={style.firstP}>make your appointment in a second!</p>
                    <p className={style.secondP}>
                        Welcome to the Doctor Appointment
                        Reservation Website! Here, you'll find the best
                        healthcare experience at your fingertips. With
                        the convenience of online and fast doctor
                        appointments, you no longer have to wait in
                        long queues. We make it easy for you to quickly
                        schedule an appointment with your chosen
                        doctor and receive top-notch consultation and
                        treatment. From today, take a step towards
                        better health and improve your quality of life
                    </p>
                </div>
                <div className={style.cover}>

                </div>
            </div>
        </div>
    );
};

export default Home;

import React, {useState} from 'react';
import Card from "../../../components/card/card.jsx";
import style from './setting.module.scss'

const Setting = () => {

    const [form, setForm] = useState({
        expertise: "",
    })

    return (
        <div className={style.container}>
            <Card title="Settings">

            </Card>
        </div>
    );
};

export default Setting;

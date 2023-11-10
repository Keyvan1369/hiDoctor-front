import React from 'react';
import style from "./header.module.scss";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {

    const isAuthenticated = useSelector(store => store.auth.isAuthenticated)
    return (
        <header className={style.header}>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {
                        isAuthenticated ? <>
                            <li><Link to="/register">Panel</Link></li>
                        </> : <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;

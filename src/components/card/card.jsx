import React from 'react';
import style from './card.module.scss'

const Card = ({children, title,className}) => {
    return (
        <div className={`${style.card} ${className}`}>
            {title && <h1 className={style.h1}>{title}</h1>}
            {children}
        </div>
    );
};

export default Card;

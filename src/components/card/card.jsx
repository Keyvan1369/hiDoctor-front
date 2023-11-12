import style from "./card.module.scss";

const Card = ({ children, title, className, description, action }) => {
  return (
    <div className={`${style.card} ${className}`}>
      <header className={style.header}>
        {title && <h1 className={style.h1}>{title}</h1>}
        {action}
      </header>
      {description && <p className={style.hint}>{description}</p>}
      {children}
    </div>
  );
};

export default Card;

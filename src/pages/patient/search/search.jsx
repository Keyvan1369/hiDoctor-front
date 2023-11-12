import { useState } from "react";
import SearchBox from "../../../components/searchBox/searchBox";
import style from "./search.module.scss";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={style.container}>
      <h1>Hi Doctor 🤚</h1>
      <p className={style.p}>What kind of medicine are you looking for?</p>
      <SearchBox
        value={inputValue}
        onChangeValue={(value) => setInputValue(value)}
      />
    </div>
  );
};

export default Search;

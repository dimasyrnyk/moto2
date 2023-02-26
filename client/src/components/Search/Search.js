import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { productSearch } from "./../../store/products/actions";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && searchValue !== "") {
      dispatch(productSearch(searchValue));
      setSearchValue("");
      history.push("/search");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (searchValue !== "") {
      dispatch(productSearch(searchValue));
      setSearchValue("");
      history.push("/search");
    }
  };

  return (
    <span className="search">
      <input
        className="search__input"
        type="text"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Пошук"
      />
      <span
        className="search__button"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </span>
  );
}

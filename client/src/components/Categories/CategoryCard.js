import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./CategoryCard.scss";

export default function CategoryCard({ category }) {
  return (
    <li className="card">
      <Link
        to={"/" + category.link}
        className="category__card"
      >
        <img
          className="card__img"
          src={category.image}
          alt="Category item"
        />
        <h3>{category.name}</h3>
      </Link>
    </li>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
};

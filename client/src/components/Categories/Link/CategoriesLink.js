import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function CategoriesLink({ category }) {
  return (
    <>
      <Link to={"/" + category.link} className="categories_link">
        <span>{category.name}</span>
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </>
  );
}

CategoriesLink.propTypes = {
  category: PropTypes.object.isRequired,
};

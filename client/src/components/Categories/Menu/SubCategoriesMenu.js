import React from "react";
import { useSelector } from "react-redux";
import SubCategoriesLink from "./../Link/SubCategoriesLink";
import PropTypes from "prop-types";

export default function SubCategoriesMenu({ parent }) {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <ul className="subcategories_list">
      {categories
        .filter((i) => i.parentId === parent._id)
        .map((item) => (
          <SubCategoriesLink
            category={item}
            key={item._id}
          />
        ))}
    </ul>
  );
}

SubCategoriesMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  parent: PropTypes.object.isRequired,
};

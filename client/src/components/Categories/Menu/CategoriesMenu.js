import React from "react";
import { useSelector } from "react-redux";
import SubCategoriesMenu from "../Menu/SubCategoriesMenu";
import CategoriesLink from "./../Link/CategoriesLink";
import PropTypes from "prop-types";

export default function CategoriesMenu() {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className="categories">
      <ul className="categories_list">
        {categories
          .filter((item) => item.parentId === null)
          .map((item) => (
            <li key={item._id}>
              <CategoriesLink category={item} />
              {categories.filter((i) => i.parentId === item._id).length > 0 && (
                <SubCategoriesMenu parent={item} />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

CategoriesMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};

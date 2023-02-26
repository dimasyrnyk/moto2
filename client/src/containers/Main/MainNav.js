import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import { addNavLink, removeNavLink } from "../../store/app/actions";

export default function MainNav() {
  const { product, categories, navLinks } = useSelector((state) => ({
    product: state.products.oneProduct,
    categories: state.categories.categories,
    navLinks: state.app.navLinks,
  }));
  let { url } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    const link = url.split("/").pop();

    if (link === product._id) {
      dispatch(removeNavLink());
      addToNavList(product.category, true);
    } else if (url !== "/" && categories.length) {
      dispatch(removeNavLink());
      addToNavList(link);
    }
  }, [url, product._id]);

  const addToNavList = (link, showLink = false) => {
    const cat = categories.find((i) => i.link === link);

    if (showLink) {
      dispatch(addNavLink(cat));
      addToNavList(cat.link);
    } else if (cat !== undefined && cat.parentId) {
      const parentCat = categories.find((i) => i._id === cat.parentId);
      dispatch(addNavLink(parentCat));
      addToNavList(parentCat.link);
    }
  };

  if (url !== "/") {
    return (
      <div className="main__navigation">
        <Link
          to="/"
          className="main__navigation__link"
        >
          <FontAwesomeIcon icon={faHome} />
        </Link>
        {navLinks.map((item) => (
          <Link
            to={"/" + item.link}
            className="main__navigation__link"
            key={item._id}
          >
            <span className="main__navigation__link">|</span>
            {item.name}
          </Link>
        ))}
      </div>
    );
  }
  return <></>;
}

MainNav.propTypes = {
  product: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.object),
  navLinks: PropTypes.array,
  addNavLink: PropTypes.func,
  removeNavLink: PropTypes.func,
};

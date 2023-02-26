import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert/Alert";
import ProductCard from "../Product/ProductCard";
import CategoryCard from "./CategoryCard";
import { AppLoader } from "../AppLoader/AppLoader";
import { productsLoad } from "./../../store/products/actions";
import PropTypes from "prop-types";

export default function CategoryPage({ match }) {
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const products = useSelector((state) => state.products.loadProducts);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories.find((c) => c.link === match.params.link));
    }
    dispatch(productsLoad(match.params.link));
  }, [match.params.link, categories, dispatch]);

  const producstList = () => {
    if (products.length > 0) {
      return products.map((p) => (
        <ProductCard
          product={p}
          key={p._id}
        />
      ));
    }
  };

  const categoriesList = () => {
    const cat = categories.filter((c) => c.parentId === category._id);
    if (cat.length > 0) {
      return cat.map((c) => (
        <CategoryCard
          key={c._id}
          category={c}
        />
      ));
    }
  };

  if (app.loading) return <AppLoader />;

  return (
    <>
      {app.alertMessage && <Alert />}
      <h2 className="list__title">{category.name}</h2>
      <ul className="list">
        {producstList()}
        {categoriesList()}
      </ul>
    </>
  );
}

CategoryPage.propTypes = {
  app: PropTypes.object,
  products: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  productsLoad: PropTypes.func,
};

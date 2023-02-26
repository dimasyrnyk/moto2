import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { productsLoadHomePage } from "../store/products/actions";
import { AppLoader } from "../components/AppLoader/AppLoader";
import ProductCard from "../components/Product/ProductCard";
import CategoriesMenu from "../components/Categories/Menu/CategoriesMenu";
import HomeDescription from "./PageDescription/HomeDescription";

export default function HomePage() {
  const products = useSelector((state) => state.products.homePageProducts);
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(productsLoadHomePage());
    };

    loadData();
  }, [dispatch]);

  if (app.loading) return <AppLoader />;

  return (
    <>
      <div className="home-page__first-row">
        <CategoriesMenu />
        <div className="categories_menu"></div>
      </div>
      <h3 className="list__title">Нові поступлення</h3>
      <ul className="list">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product._id}
          />
        ))}
      </ul>
      <HomeDescription />
    </>
  );
}

HomePage.propTypes = {
  app: PropTypes.object,
  products: PropTypes.arrayOf(PropTypes.object),
  productsLoadHomePage: PropTypes.func,
};

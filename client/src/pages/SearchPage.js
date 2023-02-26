import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Alert from "../components/Alert/Alert";
import ProductCard from "../components/Product/ProductCard";
import { AppLoader } from "../components/AppLoader/AppLoader";
import { productsSearchLoad } from "./../store/products/actions";

export default function SearchPage() {
  const { searchValue, products, app } = useSelector((state) => ({
    searchValue: state.products.searchValue,
    product: state.products.searchProducts,
    app: state.app,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsSearchLoad(searchValue));
  }, [dispatch, searchValue]);

  if (app.loading) return <AppLoader />;

  return (
    <>
      {app.alertMessage && <Alert />}
      <h2>{searchValue || "Пошук"}</h2>
      <ul className="list">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              product={p}
              key={p._id}
            />
          ))
        ) : (
          <p>Товарів не знайдено..</p>
        )}
      </ul>
    </>
  );
}

SearchPage.propTypes = {
  app: PropTypes.object,
  products: PropTypes.arrayOf(PropTypes.object),
  searchValues: PropTypes.array,
  productsSearchLoad: PropTypes.func,
};

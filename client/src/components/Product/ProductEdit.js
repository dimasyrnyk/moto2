import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./Product.scss";
import { AppLoader } from "../AppLoader/AppLoader";
import ProductAddForm from "./ProductAddForm";
import {
  oneProductLoad,
  productEdit,
  productRemove,
} from "../../store/products/actions";

export default function ProductEdit() {
  const [product, setProduct] = useState(null);
  const productId = useParams().productId;
  const { activeUser, loadedProduct, token } = useSelector((state) => ({
    loadedProduct: state.products.oneProduct,
    activeUser: state.activeUser.info,
    token: state.activeUser.token,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadedProduct._id === productId) {
      setProduct(loadedProduct);
    } else {
      dispatch(oneProductLoad(productId));
    }
  }, [dispatch, loadedProduct, productId]);

  const handleBack = () => history.goBack();

  const handleRemove = () => {
    dispatch(productRemove({ _id: product._id, token }));
  };

  const handleSubmit = () => {
    if (product.title && product.src) {
      dispatch(productEdit({ product, token }));
      history.push("/product/" + product._id);
    }
  };

  if (!product) return <AppLoader />;

  if (!activeUser.roles.includes("ADMIN")) {
    handleBack();
  }

  // Re-rendering;

  return (
    <>
      <h2>Товар - {product.title}</h2>
      <div className="add-product__body">
        <ProductAddForm
          product={product}
          setProduct={setProduct}
        />
        <div className="controls">
          <button
            className="controls__btn"
            onClick={handleSubmit}
          >
            Зберегти
          </button>
          <button
            className="controls__btn"
            onClick={handleBack}
          >
            Скасувати
          </button>
          <button
            className="controls__btn"
            onClick={handleRemove}
          >
            Видалити
          </button>
        </div>
      </div>
    </>
  );
}

ProductEdit.propTypes = {
  activeUser: PropTypes.object,
  token: PropTypes.string,
  loadedProduct: PropTypes.object,
  oneProductLoad: PropTypes.func,
  productEdit: PropTypes.func,
  productRemove: PropTypes.func,
};

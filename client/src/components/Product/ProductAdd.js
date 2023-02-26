import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import "./Product.scss";
import { productCreate } from "../../store/products/actions";
import ProductAddForm from "./ProductAddForm";

const newProduct = {
  title: "",
  src: "",
  category: "new-parts",
  producer: "",
  code: "",
  quantity: 0,
  status: 1,
  price: 0,
  businessPrice: 0,
  shortDesc: "",
  fullDesc: "",
};

export default function ProductAdd() {
  const [product, setProduct] = useState(newProduct);
  const activeUser = useSelector((state) => state.activeUser.info);
  const token = useSelector((state) => state.activeUser.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
    if (product.title && product.src) {
      dispatch(productCreate({ product, token }));
      setProduct(newProduct);
    }
  };

  const handleClearInputs = () => {
    setProduct(newProduct);
  };

  if (!activeUser.roles.includes("ADMIN")) {
    history.goBack();
  }

  return (
    <>
      <h2>Новий товар</h2>
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
            Додати товар
          </button>
          <button
            className="controls__btn"
            onClick={handleClearInputs}
          >
            Очистити
          </button>
        </div>
      </div>
    </>
  );
}

ProductAdd.propTypes = {
  activeUser: PropTypes.object,
  token: PropTypes.string,
};

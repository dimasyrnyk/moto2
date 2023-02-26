import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function Alert() {
  const alert = useSelector((state) => state.app.alert);

  if (alert) {
    return <div className={"alert " + alert.color}>{alert.text}</div>;
  }

  return null;
}

Alert.propTypes = {
  alert: PropTypes.object,
};

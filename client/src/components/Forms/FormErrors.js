import React from "react";

export default function FormErrors(props) {
  const translateData = {
    email: "email",
    password: "пароль",
    confirm: "підтвердіть",
    firstName: "ім'я",
    lastName: "прізвище",
    phone: "номер телефону",
  };

  return (
    <div className="formErrors">
      {Object.keys(props.formErrors).map((fieldName, i) => {
        if (
          fieldName === props.name &&
          props.formErrors[fieldName].length > 0
        ) {
          return (
            <p key={Date.now().toString()}>
              {translateData[fieldName]} {props.formErrors[fieldName]}
            </p>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
}

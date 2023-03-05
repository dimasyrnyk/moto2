import { useMemo } from "react";

export const useFormatUAH = (number) => {
  const formattedNumber = useMemo(() => {
    return number.toLocaleString("uk-UA", {
      style: "currency",
      currency: "UAH",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, [number]);

  return formattedNumber;
};

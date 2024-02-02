import React from "react";

const Price = ({ number = 0 }) => {
  return <>{`$ ${number.toFixed(2)}`}</>;
};

export default Price;

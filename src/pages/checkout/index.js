import React from "react";
import ShoppingCart from "./components/shopping-cart";
import CardDetails from "./components/card-details";

const Checkout = () => {
  return (
    <div className="container">
      <div className="checkout-content">
        <ShoppingCart />
        <CardDetails />
      </div>
    </div>
  );
};

export default Checkout;

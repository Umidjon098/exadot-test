import React, { useContext } from "react";
import cls from "./shopping-cart.module.css";
import CartProduct from "../../../components/cart-product";
import { CartContext } from "../../../context/cart-context";

const ShoppingCart = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className={cls.shopping_cart}>
      <div className={cls.cart_header}>
        <div className={cls.title}>Shopping Continue</div>
      </div>
      <div className={cls.cart_content}>
        <div className={cls.cart_content_top}>
          <div className={cls.title}>Shopping cart</div>
          <div
            className={cls.desc}
          >{`You have ${cartItems?.length} item in your cart`}</div>
        </div>
        {cartItems?.map((product, key) => (
          <CartProduct key={key} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;

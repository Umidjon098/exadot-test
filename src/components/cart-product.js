import React, { useContext } from "react";
import cls from "./cart-product.module.css";
import { CartContext } from "../context/cart-context";
import Price from "./price";

const CartProduct = ({ product }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className={cls.cart_product}>
      <div className={cls.general_data}>
        <div className={cls.product_img}>
          <img src={product.image} alt="pizza" width={80} height={80} />
        </div>
        <div className={cls.product_data}>
          <div className={cls.product_name}>{product.name}</div>
          <div className={cls.product_desc}>{product.description}</div>
        </div>
      </div>
      <div className={cls.action_btns}>
        <div className={cls.counter}>
          <div className={cls.count}>{product.quantity}</div>
          <div
            className={cls.inc}
            onClick={() => increaseQuantity(product.id)}
          />
          <div
            className={cls.dec}
            onClick={() => decreaseQuantity(product.id)}
          />
        </div>
        <div className={cls.price}>
          <Price number={product.price} />
        </div>
        <div
          className={cls.delete}
          onClick={() => removeFromCart(product.id)}
        />
      </div>
    </div>
  );
};

export default CartProduct;

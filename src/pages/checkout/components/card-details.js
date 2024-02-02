import React, { useContext, useState } from "react";
import cls from "./card-detail.module.css";
import { CartContext } from "../../../context/cart-context";
import Price from "../../../components/price";

const CardDetails = () => {
  const [formData, setFormData] = useState({});
  const { subTotalPrice, shippingPrice, totalPrice, openDBInstance } =
    useContext(CartContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const db = await openDBInstance("orderDB", "order");
    const tx = db.transaction("order", "readwrite");
    const store = tx.objectStore("order");
    await store.add({ ...formData, subTotalPrice, shippingPrice, totalPrice });
    await tx.done;
    setFormData({ name: "", card_number: "", expiration_date: "", cvv: "" });
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className={cls.card_details}>
      <div className={cls.card_header}>
        <div className={cls.card_title}>Card Details</div>
        <img src="./avatar.png" alt="user_avatar" width={50} height={50} />
      </div>
      <div className={cls.payment_types}>
        <div className={cls.payment_type_item}>
          <img src="./master-card.png" alt="master_card" />
        </div>
        <div className={cls.payment_type_item}>
          <img src="./visa.png" alt="visa" />
        </div>
        <div className={cls.payment_type_item}>
          <img src="./rupay.png" alt="rupay" />
        </div>
        <div className={`${cls.payment_type_item} ${cls.button}`}>See all</div>
      </div>
      <div className={cls.card_detail_form}>
        <form onSubmit={onSubmit}>
          <div className={cls.form_group}>
            <label>Name on card</label>
            <input
              required
              name="name"
              placeholder="Name"
              onChange={handleInput}
              value={formData.name}
            />
          </div>
          <div className={cls.form_group}>
            <label>Card Number</label>
            <input
              required
              name="card_number"
              onChange={handleInput}
              value={formData.card_number}
              placeholder="1111 2222 3333 4444"
            />
          </div>
          <div className={cls.flex}>
            <div className={cls.form_group}>
              <label>Expiration date</label>
              <input
                required
                placeholder="mm/yy"
                onChange={handleInput}
                name="expiration_date"
                value={formData.expiration_date}
              />
            </div>
            <div className={cls.form_group}>
              <label>CVV</label>
              <input
                required
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="divider" />
          <div className={cls.price_box}>
            <div className={cls.item}>
              <div className={cls.label}>Subtotal</div>
              <div className={cls.value}>
                <Price number={subTotalPrice} />
              </div>
            </div>
            <div className={cls.item}>
              <div className={cls.label}>Shipping</div>
              <div className={cls.value}>
                <Price number={shippingPrice} />
              </div>
            </div>
            <div className={cls.item}>
              <div className={cls.label}>Total (Tax incl.)</div>
              <div className={cls.value}>
                <Price number={totalPrice} />
              </div>
            </div>
          </div>
          <button type="submit">
            <div className={cls.price}>
              <Price number={totalPrice} />
            </div>
            <div className={cls.btn_link}>Checkout</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardDetails;

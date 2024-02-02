// context.js
import React, { createContext, useMemo, useState } from "react";
import { openDB } from "idb";
import { useEffect } from "react";
import { dbName, storeName } from "../assets/constants";
import { state } from "../data";
// Create a context with a default value (optional)
const CartContext = createContext();

// Create a provider component
const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const openDBInstance = async (dbName, storeName) => {
    return await openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    });
  };

  const loadProducts = async (isEffect) => {
    const db = await openDBInstance(dbName, storeName);
    const cartItems = await db.getAll(storeName);

    if (!cartItems.length && isEffect) {
      state.forEach((element) => {
        addToCart(element);
      });
      setCartItems(state);
    } else setCartItems(cartItems);
  };

  const removeFromCart = async (id) => {
    const db = await openDBInstance(dbName, storeName);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.delete(id);
    await tx.done;
    loadProducts();
  };

  const increaseQuantity = async (id) => {
    const db = await openDBInstance(dbName, storeName);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const product = await store.get(id);
    product.quantity++;
    await store.put(product);
    await tx.done;
    loadProducts();
  };

  const decreaseQuantity = async (id) => {
    const db = await openDBInstance(dbName, storeName);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const product = await store.get(id);

    if (product.quantity > 1) {
      product.quantity--;
      await store.put(product);
    } else {
      await store.delete(id);
    }

    await tx.done;
    loadProducts();
  };

  const addToCart = async (product) => {
    const db = await openDBInstance(dbName, storeName);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.add(product);
    await tx.done;
    loadProducts();
  };

  useEffect(() => {
    // Load products when the component mounts
    loadProducts(true);
  }, []);

  const subTotalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [cartItems]);

  const shippingPrice = useMemo(() => {
    return cartItems[0]?.shipping || 0;
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return subTotalPrice + shippingPrice;
  }, [subTotalPrice, shippingPrice]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        shippingPrice,
        subTotalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        openDBInstance,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };

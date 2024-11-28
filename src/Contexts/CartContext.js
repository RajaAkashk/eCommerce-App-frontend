import React, { children, createContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  //******************* get All the cart products data *******************
  const { data, loading, error } = useFetch(
    "https://e-commerce-app-backend-seven.vercel.app/cart/get/products"
  );
  useEffect(() => {
    if (data) {
      console.log("Data from cart in cart  context", data);
      setCartList(data.products);
    }
  }, [data]);

  //********************* Add Product To Cart *********************
  const addProductToCart = async (product) => {
    try {
      const response = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/products/add/cart",
        {
          method: "POST",
          body: JSON.stringify(product),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        console.log("Add to Cart response is not okay.");
        return;
      }

      const data = await response.json();
      console.log("Add to cart successfully.", data);

      updatedTheFetchData();
    } catch (error) {
      console.log("Error in adding product to cart:", error);
    }
  };

  const updatedTheFetchData = async () => {
    // Re-fetch the cart from MongoDB after adding a new item
    const updatedCart = await fetch(
      "https://e-commerce-app-backend-seven.vercel.app/cart/get/products"
    );
    const updatedData = await updatedCart.json();
    setCartList(updatedData.products);
  };

  //*************** Delete product from cart ***************
  const deleteProductFromCart = async (product) => {
    console.log("product id from cart context :- ", product._id);
    try {
      const response = await fetch(
        `https://e-commerce-app-backend-seven.vercel.app/product/cart/delete/${product._id}`,
        { method: "DELETE" }
      );
      console.log("response:-", response);
      console.log("product.productInfo.name:-", product.name);
      if (!response.ok) {
        console.log("Error in response from product cart delete.");
      }
      const data = await response.json();

      setCartList(cartList.filter((cart) => cart._id !== product._id));

      // Re-fetch the cart from MongoDB after adding a new item
      const updatedCart = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/cart/get/products"
      );
      const updatedData = await updatedCart.json();
      setCartList(updatedData.products);

      console.log("Deleted from Cart.", data);
    } catch (error) {
      console.log("Error in deleting Product from cart.", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addProductToCart,
        deleteProductFromCart,
        loading,
        error,
        updatedTheFetchData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };

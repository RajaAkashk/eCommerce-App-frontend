import React from "react";
import { createContext, useState } from "react";

const productContext = createContext();

function ProductProvider({ children }) {
  // update the product quantity and size

  try {
    const updateProduct = async (product) => {
      const response = await fetch(
        `https://e-commerce-app-backend-seven.vercel.app/cart/product/update/${product._id}`,
        {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Update product response is not okay.");
        return;
      }

      const data = await response.json();
      console.log("Add to cart successfully.", data);
    };
  } catch (error) {
    console.log("error in Updating the product quantity & size :- ", error);
  }

  return (
    <productContext.Provider value={{ updateProduct }}>
      {children}
    </productContext.Provider>
  );
}

export { productContext, ProductProvider };

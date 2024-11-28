import React, { createContext, useState } from "react";

const ProductContext = createContext();

function ProductProvider({ children }) {
  // Define the updateProduct function outside of try block
  const updateProduct = async (product) => {
    try {
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
      console.log("Updated cart product successfully.", data);
      return data;
      
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  };

  return (
    <ProductContext.Provider value={{ updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };

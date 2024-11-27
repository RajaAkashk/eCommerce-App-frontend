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
      console.log("Add to cart successfully.", data);
    } catch (error) {
      console.log("Error in updating the product quantity & size:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };

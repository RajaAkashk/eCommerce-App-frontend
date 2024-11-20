import React, { createContext, useState, useEffect } from "react";
import useFetch from "../useFetch";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishList] = useState([]);

  // get All wihslist products
  const { data, loading, error } = useFetch(
    "https://e-commerce-app-backend-seven.vercel.app/wishlist/products"
  );

  useEffect(() => {
    if (data) {
      console.log("Wishlist Context Page:-", data.products);
      setWishList(data.products);
    }
  }, [data]);

  // Add to wishlist function
  const addToWishlist = async (product) => {

    try {
      const response = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/products/wishlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );
      if (!response.ok) {
        console.log("Network response is not okay for wishlist.");
        return;
      }
      const data = await response.json();
      // Re-fetch the wishlist from MongoDB after adding a new item
      const updatedWishlist = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/wishlist/products"
      );
      const updatedData = await updatedWishlist.json();
      setWishList(updatedData.products); // Update the state with the latest data from the backend
    } catch (error) {
      console.log("Error adding product to wishlist:", error);
    }
  };

  // Remove from wishlist function
  const removeFromWishlist = async (product) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-backend-seven.vercel.app/product/delete/${product._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Deleted successfully.");
        setWishList(
          wishlist.filter((data) => data.productInfo._id != product._id)
        );
      } else {
        console.log("Failed to delete the item from wishlist.");
      }
    } catch (error) {
      console.log("Error in deleteing data.", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        loading,
        error,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistProvider, WishlistContext };

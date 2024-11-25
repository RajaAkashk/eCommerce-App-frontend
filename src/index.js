import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductPage from "./Pages/ProductPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import WishlistPage from "./Pages/WishlistPage";
import ProductCartPage from "./Pages/ProductCartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import UserPage from "./Pages/UserPage";
// contexts
import { WishlistProvider } from "./Contexts/WishlistContext";
import { CartProvider } from "./Contexts/CartContext";
import { AddressContextProvider } from "./Contexts/AddressContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products/:productCategory",
    element: <ProductPage />,
  },
  {
    path: "/productsPage/:productId",
    element: <ProductDetailsPage />,
  },
  {
    path: "/wishlistPage",
    element: <WishlistPage />,
  },
  {
    path: "/cartPage",
    element: <ProductCartPage />,
  },
  {
    path: "/checkoutPage",
    element: <CheckoutPage />,
  },
  {
    path: "/userPage",
    element: <UserPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WishlistProvider>
      <CartProvider>
        <AddressContextProvider>
          <RouterProvider router={router} />
        </AddressContextProvider>
      </CartProvider>
    </WishlistProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

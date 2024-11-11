import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductPage from "./Pages/ProductPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import WishlistPage from "./Pages/WishlistPage";
import ProductCartPage from "./Pages/ProductCartPage";

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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

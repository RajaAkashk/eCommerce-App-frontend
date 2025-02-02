import { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import useFetch from "../useFetch";
import StarRating from "../Components/StarRating";
import { Link } from "react-router-dom";
import { CartContext } from "../Contexts/CartContext";
import { WishlistContext } from "../Contexts/WishlistContext";
import { ProductContext } from "../Contexts/ProductsContext";

const ProductCartPage = () => {
  const {
    cartList,
    deleteProductFromCart,
    loading,
    error,
    updatedTheFetchData,
  } = useContext(CartContext);

  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const { updateProduct } = useContext(ProductContext);

  // Alerts
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertForQuantityIncrease, setAlertForQuantityIncrease] =
    useState(false);
  const [alertForQuantityDecrease, setAlertForQuantityDecrease] =
    useState(false);

  const [cartListData, setCartListData] = useState([]);
  const [newStore, setNewStore] = useState([]);

  useEffect(() => {
    setCartListData(cartList);
    console.log("setCartListData :-", cartList);
  }, [cartList]);

  useEffect(() => {
    updatedTheFetchData();
  }, []);

  // Matching cart data with wishlist data.
  useEffect(() => {
    matchProducts();
  }, []);

  //******************** Error Handling ********************
  if (error) {
    return (
      <p className="text-center py-5 fs-4 fw-medium text-danger">
        Error loading Cart Product.
      </p>
    );
  }

  //*************** Delete product from cart ***************
  const deleteCartHandler = (data) => {
    deleteProductFromCart(data);
    setDeleteAlert(true);
    setTimeout(() => setDeleteAlert(false), 1000);
  };

  // To check the cart product and wishlist product are same wishlist

  console.log("WISHLIST DATA FROM CART :", wishlist);
  console.log("cartList DATA FROM CART :", cartList);

  const matchProducts = () => {
    if (cartList.length > 0 && wishlist.length > 0) {
      let matchedProducts = [];

      wishlist.forEach((wishlistItem) => {
        const wishlistProductId = wishlistItem.productInfo?._id;
        if (wishlistProductId) {
          const matchingProduct = cartList.find(
            (product) =>
              String(product.productInfo._id) === String(wishlistProductId)
          );
          if (matchingProduct) {
            if (!newStore.includes(wishlistProductId)) {
              matchedProducts.push(wishlistProductId); // Collect all matched product ids
              console.log("Found matching product:", matchingProduct);
            } else {
              console.log("Product already in newStore:", matchingProduct);
            }
          } else {
            console.log("No matching product found for wishlist item:");
          }
        }
      });

      // Update newStore with matched product ids
      if (matchedProducts.length > 0) {
        setNewStore(matchedProducts);
      }
    }
  };

  console.log("NEW STORE:::::", newStore);

  //****************** adding products to wishlist ******************
  const addToWishlistHandler = async (product) => {
    addToWishlist(product.productInfo);
    setAlertMessage(true);
    setTimeout(() => {
      setAlertMessage(false);
    }, 1000);
  };

  //****************** Removing product from wishlist ******************
  const removefromwishlistHandler = async (product) => {
    console.log("remove from wish list Handler :- ", product.productInfo);
    removeFromWishlist(product.productInfo);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  // total number of products
  const totalProducts = cartListData.reduce(
    (acc, curr) => (acc = acc + parseInt(curr.productInfo.quantity)),
    0
  );
  // total price of products
  const totalPrice = cartListData.reduce(
    (acc, curr) =>
      acc +
      parseInt(curr.productInfo.quantity) * parseInt(curr.productInfo.price),
    0
  );

  // Update product quantity

  const handleIncrement = async (product) => {
    if (product.quantity < 20) {
      const updatedProduct = { ...product, quantity: product.quantity + 1 };

      // Await backend response to update the product
      const updatedBackendProduct = await updateProduct(updatedProduct);
      console.log("updatedBackendProduct :-", updatedBackendProduct);

      if (updatedBackendProduct) {
        setCartListData((prevCartList) =>
          prevCartList.map((item) =>
            item.productInfo._id === updatedBackendProduct.products._id
              ? { ...item, productInfo: updatedBackendProduct.products } // Update productInfo directly from backend response
              : item
          )
        );
        setAlertForQuantityIncrease(true);
        setTimeout(() => {
          setAlertForQuantityIncrease(false);
        }, 1000);
      } else {
        console.error("Failed to update product in the backend.");
      }
    }
  };

  const handleDecrement = async (product) => {
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };

      const updatedBackendProduct = await updateProduct(updatedProduct);
      if (updatedBackendProduct) {
        setCartListData((prevCartList) =>
          prevCartList.map((item) =>
            item.productInfo._id === updatedBackendProduct.products._id
              ? { ...item, productInfo: updatedBackendProduct.products }
              : item
          )
        );
        setAlertForQuantityDecrease(true);
        setTimeout(() => {
          setAlertForQuantityDecrease(false);
        }, 1000);
      }
    }
  };

  return (
    <>
      <Header />
      <section className="py-5">
        <div className="container">
          {/***************** Alerts *****************/}
          {(alertMessage ||
            showAlert ||
            deleteAlert ||
            alertForQuantityIncrease ||
            alertForQuantityDecrease) && (
            <div
              className="alert alert-success text-center position-fixed  top-1  alertMessageProductCartPage"
              role="alert"
            >
              <span className="fs-5 fw-medium">
                {alertMessage
                  ? "Added to Wishlist."
                  : showAlert
                  ? "Removed from Wishlist."
                  : alertForQuantityDecrease
                  ? "One Item Removed"
                  : alertForQuantityIncrease
                  ? "One Item Added"
                  : "Item removed from cart."}
              </span>
            </div>
          )}

          <div className="row">
            <div className="col-md-7">
              {/******************** Display Cart Data ********************/}
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "90vh" }}
                >
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : cartListData.length != 0 ? (
                <div className="row">
                  {cartListData?.map((data) => (
                    <div key={data._id} className="col-md-12">
                      <div className="card mb-3">
                        <div className="row g-0">
                          {/* Image Column */}
                          <div className="col-md-4">
                            <Link to={`/productsPage/${data.productInfo._id}`}>
                              <img
                                src={data.productInfo.productImg}
                                className="img-fluid homePageCard"
                                alt="Clothing Image"
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Link>
                          </div>

                          {/* Card Body Column */}
                          <div className="col-md-8 position-relative">
                            <div className="card-body">
                              {/* Product Name */}
                              <h5
                                className="card-title fw-medium my-2"
                                style={{ fontSize: "2.2rem" }}
                              >
                                {data.productInfo.name}
                              </h5>

                              {/* Star Rating */}
                              <p className="mb-0 mt-3">
                                <StarRating rating={data.productInfo.rating} />
                              </p>

                              <div className="pt-3 pb-2">
                                {/* Quantity of products*/}
                                <div className="">
                                  <span className="fs-5 fw-medium me-2">
                                    Quantity:{" "}
                                  </span>
                                  <button
                                    className="rounded bg-light"
                                    onClick={() =>
                                      handleIncrement(data.productInfo)
                                    }
                                  >
                                    <i className="bi bi-plus"></i>
                                  </button>
                                  <span className="mx-2">
                                    {data.productInfo.quantity}
                                  </span>
                                  <button
                                    className="rounded bg-light"
                                    onClick={() =>
                                      handleDecrement(data.productInfo)
                                    }
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                </div>
                              </div>

                              {/* product size  */}
                              <div className="py-1 pb-2">
                                <span className="fs-5 fw-medium me-2">
                                  Size:
                                </span>
                                <span className="bg-light fw-medium fs-5">
                                  {data.productInfo.selectedSize}
                                </span>
                              </div>
                              {/* Price */}
                              <p className="card-text fs-5 fw-medium">
                                Price: ₹ {data.productInfo.price}
                              </p>

                              {/************* Wishlist button *************/}
                              <button
                                onClick={(e) => {
                                  if (
                                    e.target.innerText === "Add To Wishlist"
                                  ) {
                                    addToWishlistHandler(data);
                                    e.target.innerText = "Remove From Wishlist";
                                  } else {
                                    removefromwishlistHandler(data);
                                    e.target.innerText = "Add To Wishlist";
                                  }
                                }}
                                className="my-2 btn btn-secondary text-light w-100 fs-5 fw-medium"
                                style={{ borderRadius: "0px" }}
                              >
                                {newStore.includes(data.productInfo._id)
                                  ? "Remove From Wishlist"
                                  : "Add To Wishlist"}
                              </button>

                              {/****************** Remove From Cart Button ******************/}
                              <button
                                onClick={() =>
                                  deleteCartHandler(data.productInfo)
                                }
                                className="btn btn-danger text-light w-100 fs-5 fw-medium"
                                style={{ borderRadius: "0px" }}
                              >
                                Remove Item
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "20vh" }}
                >
                  <span className="fs-5 fw-medium text-danger">
                    The cart is empty.
                  </span>
                </div>
              )}
            </div>
            <div className="col-md-5">
              <div className="border rounded text-center p-4">
                <h1 style={{ fontSize: "2.3rem" }}>
                  Total Product ({totalProducts})
                </h1>
                <h2 className="my-3 mb-4" style={{ fontSize: "1.7rem" }}>
                  Total Price: ₹ {totalPrice}
                </h2>
                <Link
                  to="/checkoutPage"
                  className="btn btn-danger w-100 fs-5 fw-medium"
                >
                  Buy Now
                </Link>
                <Link
                  to="/orderHistory"
                  className="btn btn-danger w-100 fs-5 fw-medium mt-3"
                >
                  My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCartPage;

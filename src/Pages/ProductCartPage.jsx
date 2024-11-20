import { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import useFetch from "../useFetch";
import StarRating from "../Components/StarRating";
import { Link } from "react-router-dom";
import { CartContext } from "../Contexts/CartContext";
import { WishlistContext } from "../Contexts/WishlistContext";

const ProductCartPage = () => {
  const { cartList, deleteProductFromCart, loading, error } =
    useContext(CartContext);

  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessageForWishlist, setAlertMessageForWishlist] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [newStore, setNewStore] = useState([]);
  const [quantity, setQuantity] = useState(1);

  //******************** Error Handling ********************
  if (error) {
    return (
      <p className="text-center py-5 fs-4 fw-medium text-danger">
        Error loading Cart Product {error.message}
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

  // for getting wishlist data
  useEffect(() => {
    if (wishlist) {
      setWishlistData(wishlist);
    }
  }, [wishlist]);

  console.log("WISHLIST DATA FROM CART :", wishlistData);
  console.log("cartList", cartList);

  // Matching cart data with wishlist data.
  useEffect(() => {
    if (cartList.length > 0 && wishlistData.length > 0) {
      // Initialize a new array to store matched products
      let matchedProducts = [];

      wishlistData.forEach((wishlistItem) => {
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
  }, [cartList, wishlistData]);

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

  // alert message for wishlist
  const setAlertForWishlist = () => {
    setAlertMessageForWishlist(true);
    setTimeout(() => setAlertMessageForWishlist(false), 1000);
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <Header />
      <section className="py-5">
        <div className="container">
          {/***************** Alerts *****************/}
          {alertMessage && (
            <div className="alert alert-success text-center" role="alert">
              <span className="fs-5 fw-medium">Added to Wishlist.</span>
            </div>
          )}
          {showAlert && (
            <div className="alert alert-success text-center" role="alert">
              <span className="fs-5 fw-medium">Remove from Wishlist.</span>
            </div>
          )}
          {deleteAlert && (
            <div className="alert alert-success text-center" role="alert">
              <span className="fs-5 fw-medium">Item removed from cart</span>
            </div>
          )}
          {alertMessageForWishlist && (
            <div className="alert alert-success text-center" role="alert">
              <span className="fs-5 fw-medium">Product Added To Wishlist</span>
            </div>
          )}

          <div className="row px-5">
            <div className="col-md-7">
              {/******************** Display Cart Data ********************/}
              {cartList.length != 0 ? (
                <div className="row">
                  {cartList?.map((data) => (
                    <div key={data._id} className="col-md-12">
                      <div className="card mb-3">
                        <div className="row g-0">
                          {/* Image Column */}
                          <div className="col-md-4">
                            <Link to={`/productsPage/${data.productInfo._id}`}>
                              <img
                                src={data.productInfo.productImg}
                                className="img-fluid rounded-start"
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
                              {/* Product Name and Quantity */}
                              <h5 className="card-title display-6 fw-medium my-2">
                                {data.productInfo.name}
                                {/* <span>({data.productInfo.quantity})</span> */}
                              </h5>

                              {/* Star Rating */}
                              <p className="mb-0 my-2">
                                <StarRating rating={data.productInfo.rating} />
                              </p>

                              <div className="pt-2 pb-2">
                                <span className="fs-5 fw-medium me-2">
                                  Quantity:{" "}
                                </span>
                                <button
                                  className="rounded bg-light"
                                  onClick={handleIncrement}
                                >
                                  <i class="bi bi-plus"></i>
                                </button>
                                <span className="mx-2">
                                  {data.productInfo.quantity}
                                </span>
                                <button
                                  className="rounded bg-light"
                                  onClick={handleDecrement}
                                >
                                  <i class="bi bi-dash"></i>
                                </button>
                              </div>

                              {/* Price */}
                              <p className="card-text fs-5 fw-medium">
                                ₹ {data.productInfo.price}
                              </p>

                              {/************* Wishlist button *************/}
                              <button                           
                                onClick={(e) => {
                                  if (e.target.innerText === "Add To Wishlist") {
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
                                {newStore.find(
                                  (prod) => prod === data.productInfo._id
                                )
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
                loading && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "90vh" }}
                  >
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="col-md-5">
              <div className="border rounded text-center p-5">
                <h1>
                  Total Product (
                  {cartList.reduce(
                    (acc, curr) =>
                      (acc = acc + parseInt(curr.productInfo.quantity)),
                    0
                  )}
                  )
                </h1>
                <h2 className="my-3 mb-4">
                  Total Price: ₹{" "}
                  {cartList.reduce(
                    (acc, curr) =>
                      (acc = acc + parseInt(curr.productInfo.price)),
                    0
                  )}
                </h2>
                <button className="btn btn-danger w-100 fs-5 fw-medium">
                 Checkout 
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCartPage;

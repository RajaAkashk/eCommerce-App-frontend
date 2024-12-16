import { useState, useContext, useEffect } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import StarRating from "../Components/StarRating";

import { WishlistContext } from "../Contexts/WishlistContext";
import { CartContext } from "../Contexts/CartContext";

const WishlistPage = () => {
  const [cartStore, setCartStore] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const { wishlist, removeFromWishlist, loading, error } =
    useContext(WishlistContext);

  const { cartList, addProductToCart, deleteProductFromCart } =
    useContext(CartContext);

  const [showAlert, setShowAlert] = useState(false);
  const [addCartMesssage, setAddCartMesssage] = useState(false);
  const [removeCartMesssage, setRemoveCartMesssage] = useState(false);

  // useEffect(() => {
  //   if (wishlist) {
  //     setWishlistData(wishlist);
  //   }
  // }, wishlist);

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p className="fs-1 text-danger fw-medium me-2">
          Opps! Error In Getting Wishlist
        </p>
      </div>
    );
  }

  console.log("cart list from wishlist page : - ", cartList);
  console.log("wish list from wishlist page : - ", wishlist);

  //********************* Remove From Wishlist *********************
  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000);
  };

  //********************* Add Product To Cart *********************
  const addProductToCartHandler = async (product) => {
    addProductToCart(product);
    setAddCartMesssage(true);
    setTimeout(() => setAddCartMesssage(false), 1000);
  };

  const deleteProductFromCartHandler = async (product) => {
    deleteProductFromCart(product);
    setRemoveCartMesssage(true);
    setTimeout(() => setRemoveCartMesssage(false), 1000);
  };

  const matchProducts2 = () => {
    if (wishlist.length > 0 && cartList.length > 0) {
      let matchedProducts = [];
      cartList.forEach((cartItem) => {
        const cartProductId = cartItem.productInfo?._id;

        if (cartProductId) {
          const matchingProduct = wishlist.find(
            (product) => product.productInfo._id === cartProductId
          );
          if (matchingProduct && !cartStore.includes(cartProductId)) {
            matchedProducts.push(cartProductId);
            console.log("Found matching product:", matchingProduct);
          }
        }
      });

      if (matchedProducts.length > 0) {
        setCartStore((prevCartStore) => {
          const updatedCartStore = [
            ...prevCartStore,
            ...matchedProducts.filter((id) => !prevCartStore.includes(id)),
          ];
          console.log(
            "Updated Cart Store (inside state updater):",
            updatedCartStore
          );
          return updatedCartStore;
        });
      }
    }
  };

  useEffect(() => {
    matchProducts2();
  }, []);

  return (
    <>
      <Header />
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/*********************** alerts  ***********************/}
            {(showAlert || addCartMesssage || removeCartMesssage) && (
              <div
                className="absolute top-20 alert alert-success text-center"
                role="alert"
              >
                <span className="fs-5 fw-medium">
                  {showAlert ? (
                    <>Remove from Wishlist.</>
                  ) : addCartMesssage ? (
                    <>Added to Cart</>
                  ) : removeCartMesssage ? (
                    <>Removed From Cart</>
                  ) : null}
                </span>
              </div>
            )}

            {wishlist.length > 0
              ? wishlist.map((data) => (
                  <div key={data.productInfo._id} className="col-md-3">
                    <div
                      className="card position-relative mb-4"
                      style={{ borderRadius: "0px" }}
                    >
                      {data.productInfo?.rating && (
                        <span className="position-absolute top-0 mt-3 ms-2">
                          <StarRating rating={data.productInfo.rating} />
                        </span>
                      )}
                      {/************ Remove from wishlist btn  ************/}
                      <i
                        onClick={() =>
                          handleRemoveFromWishlist(data.productInfo)
                        }
                        className="bi bi-heart-fill text-danger position-absolute top-0 end-0 me-3 mt-2 fs-1"
                      ></i>

                      <Link to={`/productsPage/${data.productInfo._id}`}>
                        <img
                          src={data.productInfo.productImg}
                          className="card-img-top"
                          alt="Clothing Image"
                          style={{
                            height: "15rem",
                            objectFit: "cover",
                            borderRadius: "0px",
                          }}
                        />
                      </Link>
                      <div className="card-body text-center p-0">
                        <p className="card-title fs-5 fw-normal pt-3">
                          {data.productInfo.name}
                        </p>
                        <p className="card-text py-0 px-3 fs-4 fw-medium">
                          ₹ {data.productInfo.price}
                        </p>

                        <button
                          onClick={(e) => {
                            if (e.target.innerText === "Add to Cart") {
                              addProductToCartHandler(data.productInfo);
                              e.target.innerText = "Remove From Cart";
                            } else {
                              deleteProductFromCartHandler(data.productInfo);
                              e.target.innerText = "Add to Cart";
                            }
                          }}
                          className="btn btn-danger text-light w-100 fs-5 fw-medium"
                          style={{ borderRadius: "0px" }}
                        >
                          {cartStore.find(
                            (item) => item === data.productInfo._id
                          )
                            ? "Remove From Cart"
                            : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : loading && (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "60vh" }}
                  >
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WishlistPage;

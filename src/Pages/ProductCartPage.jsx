import { useEffect, useState } from "react";
import Header from "../Components/Header";
import useFetch from "../useFetch";
import StarRating from "../Components/StarRating";
import { Link } from "react-router-dom";

const ProductCartPage = () => {
  const [cartList, setCartList] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [alertMessageForWishlist, setAlertMessageForWishlist] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [newStore, setNewStore] = useState([]);

  //******************* get All the cart products data *******************
  const { data, loading, error } = useFetch(
    "https://e-commerce-app-backend-seven.vercel.app/cart/get/products"
  );

  useEffect(() => {
    if (data) {
      console.log("Data from cart in cart Page", data);
      setCartList(data.products);
    }
  }, [data]);

  //******************** Error Handling ********************
  if (error) {
    return (
      <p className="text-center py-5 fs-4 fw-medium text-danger">
        Error loading Cart Product {error.message}
      </p>
    );
  }

  //*************** Delete product from cart ***************
  const DeleteProductFromCart = async (product) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-backend-seven.vercel.app/product/cart/delete/${product.productInfo._id}`,
        { method: "DELETE" }
      );
      console.log("response", response);

      if (!response.ok) {
        console.log("Error in response from product cart delete.");
      }

      const data = await response.json();

      setDeleteAlert(true);
      setTimeout(() => setDeleteAlert(false), 1000);

      setCartList(
        cartList.filter(
          (cart) => cart.productInfo._id !== product.productInfo._id
        )
      );
      console.log("Deleted from Cart.", data);
    } catch (error) {
      console.log("Error in deleting Product from cart.", error);
    }
  };

  // To check the cart product and wishlist product are same wishlist

  // for getting wishlist data
  const {
    data: moreData,
    loading: moreLoading,
    error: moreError,
  } = useFetch(
    "https://e-commerce-app-backend-seven.vercel.app/wishlist/products"
  );

  useEffect(() => {
    if (moreData) {
      console.log("WISHLIST DATA from product PAge:", moreData.products);
      setWishlistData(moreData.products);
    }
  }, [moreData]);
  if (moreLoading) {
    console.log("moreLoading..");
  }
  console.log("WISHLIST DATA FROM CART P:", wishlistData);
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
            (product) => String(product.productInfo._id) === String(wishlistProductId)
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

console.log("NEW STORE:::::",newStore)

  //****************** adding products to wishlist ******************
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
      }
      const data = await response.json();
      console.log("Response Data:", data);

      setAlertMessage(true);

      setTimeout(() => {
        setAlertMessage(false);
      }, 1000);
    } catch (error) {
      console.log("Error adding product to wishlist:", error);
    }
  };

  // alert message for wishlist
  const setAlertForWishlist = () => {
    setAlertMessageForWishlist(true);
    setTimeout(() => setAlertMessageForWishlist(false), 1000);
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

          {/******************** Display Cart Data ********************/}
          {cartList.length != 0 ? (
            <div className="row">
              {cartList?.map((data) => (
                <div key={data._id} className="col-md-3">
                  <div
                    className="card position-relative mb-4"
                    style={{ borderRadius: "0px" }}
                  >
                    <span className="position-absolute top-0 mt-3 ms-2">
                      <StarRating rating={data.productInfo.rating} />
                    </span>
                    <i
                      onClick={() => addToWishlist(data)}
                      className={`bi ${
                        newStore.find((prod) => prod == data.productInfo._id)
                          ? "bi-heart-fill text-danger"
                          : "bi-heart"
                      }  position-absolute top-0 end-0 me-3 mt-2 fs-1`}
                    ></i>

                    <Link to={`/productsPage/${data.productInfo._id}`}>
                      {" "}
                      <img
                        src={data.productInfo.productImg}
                        className="card-img-top"
                        alt="Clothing Image"
                        style={{
                          height: "15rem",
                          objectFit: "cover",
                          borderRadius: "0px",
                        }}
                      />{" "}
                    </Link>
                    <div className="card-body text-center p-0">
                      <p className="card-title fs-5 fw-normal pt-3">
                        {data.productInfo.name} <span>({data.productInfo.quantity})</span> 
                      </p> 
                      <p className="card-text py-0 px-3 fs-4 fw-medium">
                        ₹ {data.productInfo.price}
                      </p>
                      <button
                        onClick={() => DeleteProductFromCart(data)}
                        className="btn btn-danger text-light w-100 fs-5 fw-medium"
                        style={{ borderRadius: "0px" }}
                      >
                        Remove Item
                      </button>
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
      </section>
    </>
  );
};

export default ProductCartPage;

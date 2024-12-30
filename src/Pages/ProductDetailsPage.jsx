import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect, useState, useContext } from "react";
import StarRating from "../Components/StarRating";
import { WishlistContext } from "../Contexts/WishlistContext";
import { ProductContext } from "../Contexts/ProductsContext";
import { CartContext } from "../Contexts/CartContext";

function ProductDetailsPage() {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const { cartList, addProductToCart, deleteProductFromCart } =
    useContext(CartContext);

  const { updateProduct } = useContext(ProductContext);

  const [productData, setProductData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [moreProducts, setMoreProducts] = useState();

  const [wishlistData, setWishlistData] = useState([]);
  const [cartData, setCartData] = useState([]);

  // alerts
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [addCartAlert, setAddCartAlert] = useState(false);
  const [sizeChangeAlert, setSizeChangeAlert] = useState(false);

  //********* get Selected data  *********
  const dataId = useParams();
  console.log("DATA ID:-", dataId.productId);
  const selectedProductId = dataId.productId;

  const { data, loading, error } = useFetch(
    `https://e-commerce-app-backend-seven.vercel.app/products/${selectedProductId}`
  );
  useEffect(() => {
    if (data) {
      console.log(
        "selected ProductId Data from Product Details PAge:--",
        data.products
      );
      setProductData(data.products);
      setQuantity(data.products.quantity);
      setSize(data.products.selectedSize);
    }
  }, [data]);
  console.log("productData:-", productData);

  // for getting wishlist data
  useEffect(() => {
    if (wishlist) {
      const wishlistIds = wishlist.map((data) => data.productInfo._id);
      setWishlistData(wishlistIds);
    }
    if (cartList) {
      const cartListIds = cartList.map((data) => data.productInfo._id);
      setCartData(cartListIds);
    }
  }, [wishlist, cartList]);

  //****************** adding products to wishlist ******************
  const addToWishlistHandler = async (product) => {
    await addToWishlist(product.products);
    console.log("addToWishlistHandler", product.products);
    setAlertMessage(true);
    setTimeout(() => {
      setAlertMessage(false);
    }, 1000);
  };

  //****************** Removing product from wishlist ******************
  const removefromwishlistHandler = async (product) => {
    console.log("remove from wish list Handler :- ", product.products);
    await removeFromWishlist(product.products);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  //*************** Delete product from cart ***************
  const deleteCartHandler = async (data) => {
    console.log("deleteCartHandler ;- ", data.products);
    await deleteProductFromCart(data.products);
    setDeleteAlert(true);
    setTimeout(() => setDeleteAlert(false), 1000);
  };

  //*************** Add product from cart ***************
  const addCartHandler = async (data) => {
    console.log("addCartHandler ;- ", data.products);
    await addProductToCart(data.products);
    setAddCartAlert(true);
    setTimeout(() => setAddCartAlert(false), 1000);
  };

  //***********  show more products ***********
  // console.log("productData category:-", productData.category);
  // const {
  //   data: moreProductsData,
  //   loading: moreLoading,
  //   error: moreError,
  // } = useFetch(
  //   `https://e-commerce-app-backend-seven.vercel.app/products/category/${productData.category}`
  // );
  // useEffect(() => {
  //   if (moreProductsData) {
  //     console.log("moreProductsData:", moreProductsData.products);
  //     setMoreProducts(moreProductsData.products);
  //   }
  // }, [moreProductsData]);

  // console.log("moreProducts:-", moreProducts);

  // Update product Size
  const updateProductSize = (selectedSize) => {
    console.log("updateProductSize ;-", selectedSize);
    const updatedProduct = { ...productData, selectedSize };
    setSize(selectedSize);
    updateProduct(updatedProduct);
    setSizeChangeAlert(true);
    setTimeout(() => {
      setSizeChangeAlert(false);
    }, 1000);
  };

  if (error) {
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <p className="fs-4 fw-medium text-danger">
        Opps! Cannot Find Product Details Page
      </p>
    </div>;
  }

  return (
    <>
      <Header />
      <div className="container pt-2">
        {(!alertMessage ||
          showAlert ||
          deleteAlert ||
          addCartAlert ||
          sizeChangeAlert) && (
          <div
            className="position-absolute top-3 alert alert-success text-center alertMessageDetailPage"
            role="alert"
          >
            <span className="fs-5 fw-medium">
              {alertMessage
                ? "Added to Wishlist."
                : showAlert
                ? "Removed from Wishlist."
                : deleteAlert
                ? "Removed from Cart."
                : sizeChangeAlert
                ? `Selected Size "${size}"`
                : "Added to Cart."}
            </span>
          </div>
        )}
      </div>
      {data ? (
        <>
          <section className="py-4 vh-100">
            <div className="container bg-white">
              <div className="row p-4 py-5">
                {/* Product Image and Actions */}
                <div className="col-md-4">
                  <div className="position-relative mb-4">
                    <img
                      src={productData.productImg}
                      alt="Clothing Image"
                      style={{
                        width: "100%",
                        height: "50vh",
                        objectFit: "cover",
                      }}
                    />
                    <div>
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
                        {wishlistData.includes(productData._id)
                          ? "Remove From Wishlist"
                          : "Add To Wishlist"}
                      </button>

                      <button
                        onClick={(e) => {
                          if (e.target.innerText === "Add To Cart") {
                            addCartHandler(data);
                            e.target.innerText = "Remove From Cart";
                          } else {
                            deleteCartHandler(data);
                            e.target.innerText = "Add To Cart";
                          }
                        }}
                        className="my-2 btn btn-danger text-light w-100 fs-5 fw-medium"
                        style={{ borderRadius: "0px" }}
                      >
                        {cartData.includes(productData._id)
                          ? "Remove From Cart"
                          : "Add To Cart"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="col-md-8 custom-px-5">
                  <h1>{productData.name}</h1>
                  <div className="pt-2">
                    <StarRating rating={productData.rating} />
                  </div>
                  <h2 className="pt-4 text-danger">₹ {productData.price}</h2>

                  {/* Quantity Control */}
                  <div className="pt-3 pb-2">
                    <span className="fs-5 fw-medium me-2">Quantity: </span>
                    <span className=" border px-3 py-1 rounded bg-light fw-medium">
                      {quantity}
                    </span>
                  </div>

                  {/* Size Selection */}
                  <div className="d-flex py-4">
                    <span className="fs-5 fw-medium me-2">Select Size:</span>
                    {productData.size?.map((sizeOption) => (
                      <button
                        key={sizeOption}
                        onClick={() => updateProductSize(sizeOption)}
                        className={`bg-light border rounded p-2 py-1 me-2 ${
                          size === sizeOption ? "text-danger fw-bolder" : ""
                        }`}
                      >
                        {sizeOption}
                      </button>
                    ))}
                  </div>

                  <hr />

                  {/* Product Highlights */}
                  <div className="col-md-6">
                    <div className="d-flex justify-content-between">
                      {/* Feature Icons */}
                      {[
                        { icon: "bi-box-seam", text: "10 Days Returnable" },
                        { icon: "bi-cash-coin", text: "Pay On Delivery" },
                        { icon: "bi-truck", text: "Free Delivery" },
                        { icon: "bi-credit-card", text: "Secure Payment" },
                      ].map((feature, index) => (
                        <div key={index} className="text-center">
                          <i className={`bi ${feature.icon} fs-1`}></i>
                          <p>{feature.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr />
                  {/* Product Description */}
                  <div>
                    <p className="fs-4 fw-medium mb-2">Description:</p>
                    <p className="fs-5">{productData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
      )}

      {/* more products  */}

      <Footer />
    </>
  );
}
export default ProductDetailsPage;

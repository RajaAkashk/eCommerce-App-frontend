import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect, useState, useContext } from "react";
import StarRating from "../Components/StarRating";
import { WishlistContext } from "../Contexts/WishlistContext";
import { ProductContext } from "../Contexts/ProductsContext";

function ProductDetailsPage() {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const { updateProduct } = useContext(ProductContext);

  const [productData, setProductData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [moreProducts, setMoreProducts] = useState();
  const [wishlistData, setWishlistData] = useState([]);

  // alerts
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
    }
  }, [data]);
  console.log("productData:-", productData);

  // for getting wishlist data
  useEffect(() => {
    if (wishlist && Array.isArray(wishlist)) {
      setWishlistData(wishlist.map((data) => data._id));
    }
  }, [wishlist]);

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

  //***********  show more products ***********
  console.log("productData category:-", productData.category);
  const {
    data: moreProductsData,
    loading: moreLoading,
    error: moreError,
  } = useFetch(
    `https://e-commerce-app-backend-seven.vercel.app/products/category/${productData.category}`
  );
  useEffect(() => {
    if (moreProductsData) {
      console.log("moreProductsData:", moreProductsData.products);
      setMoreProducts(moreProductsData.products);
    }
  }, [moreProductsData]);

  console.log("moreProducts:-", moreProducts);

  // Update product quantity
  const handleIncrement = (product) => {
    if (product.quantity < 20) {
      const updatedProduct = { ...product, quantity: product.quantity + 1 };
      updateProduct(updatedProduct);
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = (product) => {
    if (quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      updateProduct(updatedProduct);
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (error || moreError) {
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
        {alertMessage && (
          <div
            className="position-absolute top-3 alert alert-success text-center"
            role="alert"
            style={{ width: "78%" }}
          >
            <span className="fs-5 fw-medium">Added to Wishlist.</span>
          </div>
        )}
        {showAlert && (
          <div
            className="position-absolute top-3 alert alert-success text-center"
            role="alert"
            style={{ width: "78%" }}
          >
            <span className="fs-5 fw-medium">Remove from Wishlist.</span>
          </div>
        )}
      </div>
      {data ? (
        <>
          <section className="py-4">
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
                        {wishlistData.includes(data._id)
                          ? "Remove From Wishlist"
                          : "Add To Wishlist"}

                        {/* {wishlist.some((prod) => prod._id == data._id)
                          ? "Remove From Wishlist"
                          : "Add To Wishlist"} */}
                      </button>

                      <button
                        className="btn btn-danger text-light w-100 fs-5 fw-medium mt-2"
                        style={{ borderRadius: "0px" }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="col-md-8 px-5">
                  <h1>{productData.name}</h1>
                  <div className="pt-2">
                    <StarRating rating={productData.rating} />
                  </div>
                  <h2 className="pt-4 text-danger">₹ {productData.price}</h2>

                  {/* Quantity Control */}
                  <div className="pt-3 pb-2">
                    <span className="fs-5 fw-medium me-2">Quantity: </span>
                    <button
                      className="rounded bg-light"
                      onClick={() => handleIncrement(productData)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="rounded bg-light"
                      onClick={() => handleDecrement(productData)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                  </div>

                  {/* Size Selection */}
                  <div className="d-flex py-4">
                    <span className="fs-5 fw-medium me-2">Size:</span>
                    {productData.size?.map((sizeOption) => (
                      <button
                        key={sizeOption}
                        className={`bg-light border rounded p-2 py-1 me-2 ${
                          productData.selectedSize === sizeOption
                            ? "text-danger fw-bold"
                            : ""
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
      <Footer />
    </>
  );
}
export default ProductDetailsPage;

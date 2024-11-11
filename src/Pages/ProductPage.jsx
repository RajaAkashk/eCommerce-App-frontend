import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import StarRating from "../Components/StarRating";
import ProductCartPage from "./ProductCartPage";
import { Link, useParams, useNavigate } from "react-router-dom";

function ProductPage() {
  const [productsData, setProductsData] = useState([]);
  const [productDataCopy, setProductDataCopy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [wishlistData, setWishlistData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [newStore, setNewStore] = useState([]);
  const [cartStoreData, setCartStoreData] = useState([]);
  const [cartStore, setCartStore] = useState([]);

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [alertMessageForWishlist, setAlertMessageForWishlist] = useState(false);
  const [addCartMesssage, setAddCartMesssage] = useState(false);

  const { productCategory } = useParams();
  // i have made it let so that in category select i can use it .
  let category;
  selectedCategory
    ? (category = selectedCategory)
    : (category = productCategory);

  console.log("category-", category);

  const categoryUrl = `https://e-commerce-app-backend-seven.vercel.app/products/category/${category}`;

  const url = "https://e-commerce-app-backend-seven.vercel.app/products";

  const { data, loading, error } = useFetch(
    category !== "All" ? categoryUrl : url
  );

  useEffect(() => {
    if (data) {
      console.log("CATEGORY DATA:", data.products);
      setProductsData(data.products);
      setProductDataCopy(data.products);
    }
  }, [data]);

  // for checking wishlist data
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

  useEffect(() => {
    if (productsData.length > 0 && wishlistData.length > 0) {
      // Initialize a new array to store matched products
      let matchedProducts = [];

      wishlistData.forEach((wishlistItem) => {
        const wishlistProductId = wishlistItem.productInfo?._id;

        if (wishlistProductId) {
          const matchingProduct = productsData.find(
            (product) => product._id === wishlistProductId
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
  }, [productsData, wishlistData]);

  console.log("newStore:::", newStore);

  // Check the Product Cart data is same as product data
  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useFetch(
    "https://e-commerce-app-backend-seven.vercel.app/cart/get/products"
  );

  useEffect(() => {
    if (cartData) {
      console.log("set Cart Store:---", cartData);
      setCartStoreData(cartData.products);
    }
  }, [cartData]);
  console.log("cartStore:---", cartStoreData);

  useEffect(() => {
    if (productsData.length > 0 && cartStoreData.length > 0) {
      // Initialize a new array to store matched products
      let matchedProducts = [];

      cartStoreData.forEach((cartItem) => {
        const cartProductId = cartItem.productInfo?._id;

        if (cartProductId) {
          const matchingProduct = productsData.find(
            (product) => product._id === cartProductId
          );

          if (matchingProduct) {
            if (!cartStore.includes(cartProductId)) {
              matchedProducts.push(cartProductId); // Collect all matched product ids
              console.log("Found matching product:", matchingProduct);
            } else {
              console.log("Product already in cart Store:", matchingProduct);
            }
          } else {
            console.log("No matching product found for cart item:");
          }
        }
      });
      // Update newStore with matched product ids
      if (matchedProducts.length > 0) {
        setCartStore(matchedProducts);
      }
    }
  }, [productsData, cartStoreData]);
  console.log("setCartStore:::", cartStore);

  //*************** Delete product from cart ***************
  const DeleteProductFromCart = async (product) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-backend-seven.vercel.app/product/cart/delete/${product._id}`,
        { method: "DELETE" }
      );
      console.log("response", response);

      if (!response.ok) {
        console.log("Error in response from product cart delete.");
      }

      const data = await response.json();

      setDeleteAlert(true);
      setTimeout(() => setDeleteAlert(false), 1000);

      console.log("Deleted from Cart.", data);
    } catch (error) {
      console.log("Error in deleting Product from cart.", error);
    }
  };
  console.log(
    "loading:",
    loading,
    "moreLoading:",
    moreLoading,
    "cartLoading:",
    cartLoading
  );

  //clear All Filters
  const clearAllFilters = () => {
    window.location.reload();
  };

  // For clear btn hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  //Clothing category Handler
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoryHandler = (event) => {
    const { value, checked } = event.target;
    setSelectedCategory(value);
    navigate(`/products/${value}`);
    clearAllFilters(); // so that all filter also back to default.

    setSelectedCategories((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((category) => category !== value)
    );
  };

  console.log("selectedCategories", selectedCategories);
  console.log("selectedCategory-", selectedCategory);

  //Price range Handler
  const rangeHandler = (event) => {
    const productPrice = event.target.value;
    console.log("product Price:-", productPrice);
    if (productPrice) {
      const filteredByPrice = [...productDataCopy].filter(
        (data) => data.price <= productPrice
      );
      console.log("filter PRICE RANGE - ", productsData);
      console.log("SELECTED PRICE RANGE - ", productPrice);
      console.log("filtered By Price:-", filteredByPrice);
      setProductsData(filteredByPrice);
    } else {
      setProductsData(productsData);
    }
  };

  // filter  by rating
  const productsRatingHandler = (event) => {
    const requiredRating = event.target.value;
    console.log("required Rating:-", requiredRating);
    if (requiredRating) {
      const filteredByRating = [...productsData].filter(
        (data) => data.rating === parseInt(requiredRating)
      );
      console.log("filter RATING - ", productDataCopy);
      console.log("filteredByRating:-", filteredByRating);
      setProductsData(filteredByRating);
    } else {
      setProductsData(productsData);
    }
  };

  //Sort by Price
  const SortPrice = (event) => {
    const sortOption = event.target.value;
    console.log("sort Option:-", sortOption);
    const sortedProducts = [...productsData].sort((a, b) =>
      sortOption === "Low to High" ? a.price - b.price : b.price - a.price
    );
    console.log("filter SORT PRICE - ", productsData);
    setProductsData(sortedProducts);
  };

  //****************** error handling while fetching. ******************
  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p className="fs-1 text-danger fw-medium me-2">
          Opps! Some Error Occured
        </p>
      </div>
    );
  }

  // alert message for wishlist
  const setAlertForWishlist = () => {
    setAlertMessageForWishlist(true);
    setTimeout(() => setAlertMessageForWishlist(false), 1000);
  };

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

  //********************* Add Product To Cart *********************
  const addProductToCart = async (product) => {
    try {
      const response = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/products/add/cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        console.log("Add to Cart response is not okay.");
      }
      const data = await response.json();

      setAddCartMesssage(true);
      setTimeout(() => setAddCartMesssage(false), 1000);

      console.log("Add to cart successfully.", data);
    } catch (error) {
      console.log("Error in adding product to cart:", error);
    }
  };

  //****************** products page ******************
  return (
    <>
      {/* <Header wishlist={wishlistData} /> */}
      <Header />
      <section>
        <div className="container-fluid">
          <div className="row">
            {/************* filters section  *************/}
            <div className="col-md-3 bg-light">
              <div className="container py-4">
                <div className="d-flex justify-content-between">
                  <h3>Filters</h3>
                  <button
                    onClick={clearAllFilters}
                    className="fs-5 fw-normal"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      color: isHovered ? "red" : "black",
                      textDecoration: "underline",
                      border: "none",
                      background: "none",
                    }}
                  >
                    Clear
                  </button>
                </div>
                <br />

                <div>
                  <label htmlFor="category" className="fs-4 fw-medium">
                    Category
                  </label>{" "}
                  <br />
                  <input
                    onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="All"
                    checked={category == "All" ? true : false}
                  />
                  All <br />
                  <input
                    onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Men"
                    checked={category == "Men" ? true : false}
                  />
                  Men <br />
                  <input
                    onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Women"
                    checked={category == "Women" ? true : false}
                  />
                  Women <br />
                  <input
                    onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Kids"
                    checked={category == "Kids" ? true : false}
                  />
                  Kids
                  <br />
                </div>
                <br />
                <label for="customRange3" class="fs-4 fw-medium">
                  Price Range:
                </label>
                <p className="m-0 ms-2">
                  {" "}
                  <span className="me-4 fs-5"> ₹ 1K</span>{" "}
                  <span className="mx-5 fs-5">₹ 4K</span>{" "}
                  <span className="mx-4 fs-5">₹ 7K</span>{" "}
                </p>
                <input
                  type="range"
                  class="form-range"
                  onChange={rangeHandler}
                  min="1000"
                  max="7000"
                  step="200"
                  id="customRange3"
                  style={{ width: "86%" }}
                />
                <br />
                <div>
                  <label htmlFor="rating" className="fs-4 fw-medium">
                    Rating
                  </label>{" "}
                  <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="5"
                    onChange={productsRatingHandler}
                  />
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="4"
                    onChange={productsRatingHandler}
                  />
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="3"
                    onChange={productsRatingHandler}
                  />
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="2"
                    onChange={productsRatingHandler}
                  />
                  <i class="bi bi-star-fill text-warning"></i>{" "}
                  <i class="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="1"
                    onChange={productsRatingHandler}
                  />
                  <i class="bi bi-star-fill text-warning"></i> <br />
                </div>
                <br />
                <div>
                  <label htmlFor="sortBy" className="fs-4 fw-medium">
                    Sort By
                  </label>{" "}
                  <br />
                  <input
                    type="radio"
                    name="sortBy"
                    className="me-1 form-check-input"
                    value="Low to High"
                    onChange={SortPrice}
                  />
                  Price - Low to High
                  <br />
                  <input
                    type="radio"
                    name="sortBy"
                    className="me-1 form-check-input"
                    value="High to Low"
                    onChange={SortPrice}
                  />
                  Price - High to Low <br />
                </div>
              </div>
            </div>

            {/******************************* content side  *******************************/}
            <div className="col-md-9 ">
              <div className="container py-4">
                {/***************** Alerts *****************/}
                {(alertMessage || deleteAlert || addCartMesssage) && (
                  <div
                    className="alert alert-success text-center"
                    style={{
                      position: "fixed",
                      top: "0",
                      left: "65%",
                      transform: "translateX(-50%)",
                      zIndex: "9999",
                      width: "45rem", // Set a smaller width for the alert
                      marginTop: "5rem",
                    }}
                    role="alert"
                  >
                    <span className="fs-5 fw-medium">
                      {alertMessage ? (
                        <>Added to Wishlist.</>
                      ) : deleteAlert ? (
                        <>Deleted from Wishlist.</>
                      ) : addCartMesssage ? (
                        <>Added to Cart</>
                      ) : null}
                    </span>
                  </div>
                )}
                {alertMessageForWishlist && (
                  <div className="alert alert-danger text-center" role="alert">
                    <span className="fs-5 fw-medium">
                      Product already present in Wishlist.
                    </span>
                  </div>
                )}

                {/**************** All the products ****************/}
                {productsData ? (
                  <>
                    <h2>All Products</h2>
                    <div className="row py-3">
                      {/***************** map to display data  *****************/}
                      {productsData.map((data) => (
                        <div key={data._id} className="col-md-4">
                          <div
                            className="card position-relative mb-4"
                            style={{ borderRadius: "0px" }}
                          >
                            <span className="position-absolute top-0 mt-3 ms-2">
                              <StarRating rating={data.rating} />
                            </span>
                            <i
                              onClick={
                                !newStore.includes(data._id)
                                  ? () => addToWishlist(data)
                                  : () => setAlertForWishlist()
                              }
                              className={`bi ${
                                newStore.find((prod) => prod == data._id)
                                  ? "bi-heart-fill text-danger"
                                  : "bi-heart"
                              }  position-absolute top-0 end-0 me-3 mt-2 fs-1`}
                            ></i>

                            <Link to={`/productsPage/${data._id}`}>
                              {" "}
                              <img
                                src={data.productImg}
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
                                {data.name}
                              </p>
                              <p className="card-text py-0 px-3 fs-4 fw-medium">
                                ₹ {data.price}
                              </p>
                              <button
                                onClick={() => {
                                  cartStore.find((item) => item === data._id)
                                    ? DeleteProductFromCart(data)
                                    : addProductToCart(data);
                                }}
                                className="btn btn-danger text-light w-100 fs-5 fw-medium"
                                style={{ borderRadius: "0px" }}
                              >
                                {" "}
                                {cartStore.find((item) => item === data._id)
                                  ? "Remove From Cart"
                                  : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  (loading || moreLoading || cartLoading) && (
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductPage;

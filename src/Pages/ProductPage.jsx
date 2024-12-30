import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";
import { useState, useEffect, useContext } from "react";
import useFetch from "../useFetch";
import StarRating from "../Components/StarRating";
import { Link, useParams, useNavigate } from "react-router-dom";

import { WishlistContext } from "../Contexts/WishlistContext";
import { CartContext } from "../Contexts/CartContext";

function ProductPage() {
  const [productsData, setProductsData] = useState([]);
  const [productDataCopy, setProductDataCopy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // filters
  const [productPrice, setProductPrice] = useState("");
  const [requiredRating, setRequiredRating] = useState("");
  const [sortOptionValue, setSortOptionValue] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  const [wishlistData, setWishlistData] = useState([]);
  const [newStore, setNewStore] = useState([]);
  const [cartStoreData, setCartStoreData] = useState([]);
  const [cartStore, setCartStore] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // contexts
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { cartList, addProductToCart, deleteProductFromCart } =
    useContext(CartContext);

  // All Alerts
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessageForWishlist, setAlertMessageForWishlist] = useState(false);
  const [addCartMesssage, setAddCartMesssage] = useState(false);

  const { productCategory } = useParams();
  // to store value a selected category
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

  // Handle search term and filter products
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setProductsData(productsData);
    } else {
      const filtered = productDataCopy.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProductsData(filtered);
    }
  };

  // for checking wishlist data
  useEffect(() => {
    setWishlistData(wishlist);
    if (productsData.length > 0 && wishlistData.length > 0) {
      let matchedProducts = [];
      wishlistData.map((wishlistItem) => {
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

  console.log("newStore wishlist data id same as product id:-", newStore);

  useEffect(() => {
    // if (cartList) {
    console.log("set Cart Store:---", cartList);
    setCartStoreData(cartList);
    // }
  }, [cartList]);
  console.log("cartStore:---", cartStoreData);

  useEffect(() => {
    if (productsData.length > 0 && cartStoreData.length > 0) {
      let matchedProducts = [];
      cartStoreData.map((cartItem) => {
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
  const deleteProductFromCartHandler = async (product) => {
    deleteProductFromCart(product);
    setDeleteAlert(true);
    setTimeout(() => setDeleteAlert(false), 1000);
  };

  //clear All Filters
  const clearAllFilters = () => {
    setProductPrice("");
    setRequiredRating("");
    setSortOptionValue("");
    setProductsData(data.products);
    console.log("setProductsData :-", data.products);
  };

  // For clear btn hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  //Clothing category Handler
  const navigate = useNavigate();

  const categoryHandler = (event) => {
    const { value } = event.target;
    setSelectedCategory(value);
    navigate(`/products/${value}`);
    clearAllFilters(); // all filter also back to default.
  };
  console.log("selectedCategory-", selectedCategory);

  //Price range Handler
  const rangeHandler = (event) => {
    const productPrice = event.target.value;
    setProductPrice(productPrice); // Update the price state
    console.log("product Price:-", productPrice);

    if (productPrice.length > 0) {
      const filteredByPrice = [...productDataCopy].filter(
        (data) => data.price <= productPrice
      );
      console.log("filtered By Price:-", filteredByPrice);
      setProductsData(filteredByPrice);
    } else {
      setProductsData(productsData);
    }
  };

  // filter  by rating
  const productsRatingHandler = (event) => {
    const requiredRating = event.target.value;
    setRequiredRating(requiredRating); // Update the rating state
    console.log("required Rating:-", requiredRating);
    if (requiredRating) {
      const filteredByRating = [...productDataCopy].filter(
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
    setSortOptionValue(event.target.value);
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

  console.log("wishlist from context now in product page :-", wishlist);
  //****************** adding products to wishlist ******************
  const addToWishlistHandler = async (product) => {
    console.log("addToWishlistHandler - ", product);
    console.log("add To Wish list Handler - wishlist from context ", wishlist);
    addToWishlist(product);
    setAlertMessage(true);
    setTimeout(() => {
      setAlertMessage(false);
    }, 1000);
  };

  //****************** Removing product from wishlist ******************
  const removefromwishlistHandler = async (product) => {
    console.log("remove from wish list Handler :- ", product);
    removeFromWishlist(product);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  //********************* Add Product To Cart *********************
  const addProductToCartHandler = async (product) => {
    addProductToCart(product);
    setAddCartMesssage(true);
    setTimeout(() => setAddCartMesssage(false), 1000);
  };

  function toggleFilters() {
    setIsOpen(!isOpen);
  }

  //****************** products page ******************
  return (
    <>
      <Header2 onSearch={handleSearch} />
      <section>
        <div className="container-fluid">
          <div className="row">
            {/************* filters section  *************/}

            <div className="col-md-3 bg-light py-3">
              <div className="d-flex justify-content-between">
                <button
                  className="filter-toggle fs-3 fw-medium"
                  onClick={toggleFilters}
                  style={{
                    // textDecoration: "underline",
                    border: "none",
                    background: "none",
                  }}
                >
                  Filters
                </button>
                <button
                  onClick={clearAllFilters}
                  className="fs-5 fw-normal"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    color: isHovered ? "red" : "black",
                    // textDecoration: "underline",
                    border: "none",
                    padding: "0px",
                    background: "none",
                  }}
                >
                  Clear
                </button>
              </div>

              <div className={`pt-2 filter-panel ${isOpen ? "open" : ""}`}>
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
                    checked={category === "All"}
                  />
                  All <br />
                  <input
                    onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Men"
                    checked={category === "Men"}
                  />
                  Men <br />
                  <input
                    onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Women"
                    checked={category === "Women"}
                  />
                  Women <br />
                  <input
                    onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Kids"
                    checked={category === "Kids"}
                  />
                  Kids
                  <br />
                </div>
                <br />
                <label htmlFor="customRange3" className="fs-4 fw-medium">
                  Price Range:
                </label>
                <div
                  style={{ width: "86%" }}
                  className="m-0 ms-2 d-flex justify-content-between"
                >
                  {" "}
                  <span className="fs-5"> ₹ 1K</span>{" "}
                  <span className="fs-5">₹ 4K</span>{" "}
                  <span className="fs-5">₹ 6K</span>{" "}
                </div>
                <input
                  type="range"
                  className="form-range"
                  onChange={rangeHandler}
                  value={productPrice}
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
                    checked={requiredRating == 5}
                    onChange={productsRatingHandler}
                  />
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="4"
                    checked={requiredRating == 4}
                    onChange={productsRatingHandler}
                  />
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="3"
                    checked={requiredRating == 3}
                    onChange={productsRatingHandler}
                  />
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="2"
                    checked={requiredRating == 2}
                    onChange={productsRatingHandler}
                  />
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="1"
                    checked={requiredRating == 1}
                    onChange={productsRatingHandler}
                  />
                  <i className="bi bi-star-fill text-warning"></i> <br />
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
                    checked={sortOptionValue === "Low to High"}
                    onChange={SortPrice}
                  />
                  Price - Low to High
                  <br />
                  <input
                    type="radio"
                    name="sortBy"
                    className="me-1 form-check-input"
                    value="High to Low"
                    checked={sortOptionValue === "High to Low"}
                    onChange={SortPrice}
                  />
                  Price - High to Low <br />
                </div>
              </div>
            </div>

            {/******************************* content side  *******************************/}
            <div className="col-md-9">
              <div className="container py-4">
                {/***************** Alerts *****************/}
                {(alertMessage ||
                  deleteAlert ||
                  addCartMesssage ||
                  showAlert) && (
                  <div
                    className="alert alert-success text-center alertMessageProductPage"
                    role="alert"
                  >
                    <span className="fs-5 fw-medium">
                      {alertMessage ? (
                        <>Added to Wishlist</>
                      ) : deleteAlert ? (
                        <>Removed from Cart</>
                      ) : addCartMesssage ? (
                        <>Added to Cart</>
                      ) : showAlert ? (
                        <>Removed From Wishlist</>
                      ) : null}
                    </span>
                  </div>
                )}

                {/**************** All the products ****************/}
                {productsData ? (
                  <div className="">
                    <h2>All Products</h2>
                    <div className="row py-3">
                      {/***************** map to display data  *****************/}
                      {productsData.map((data) => (
                        <div key={data._id} className="col-md-6 col-lg-6 col-xl-4">
                          <div
                            className="card position-relative mb-4"
                            style={{ borderRadius: "0px" }}
                          >
                            <span className="position-absolute top-0 mt-3 ms-2">
                              <StarRating rating={data.rating} />
                            </span>

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
                              {/*************Add To Wishlist button *************/}
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
                                className="btn btn-secondary text-light w-100 fs-5 fw-medium"
                                style={{ borderRadius: "0px" }}
                              >
                                {newStore.find((prod) => prod === data._id)
                                  ? "Remove From Wishlist"
                                  : "Add To Wishlist"}
                              </button>

                              {/**************** Add to cart button  ****************/}
                              <button
                                onClick={(e) => {
                                  if (e.target.innerText === "Add to Cart") {
                                    addProductToCartHandler(data);
                                    e.target.innerText = "Remove From Cart";
                                  } else {
                                    deleteProductFromCartHandler(data);
                                    e.target.innerText = "Add to Cart";
                                  }
                                }}
                                className="btn btn-danger text-light w-100 fs-5 fw-medium"
                                style={{ borderRadius: "0px" }}
                              >
                                {cartStore.find((item) => item === data._id)
                                  ? "Remove From Cart"
                                  : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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

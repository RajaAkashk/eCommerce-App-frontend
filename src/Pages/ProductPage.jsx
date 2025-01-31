import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";
import { useState, useEffect, useContext } from "react";
import useFetch from "../useFetch";
import StarRating from "../Components/StarRating";
import { Link, useParams, useNavigate } from "react-router-dom";
import { WishlistContext } from "../Contexts/WishlistContext";
import { CartContext } from "../Contexts/CartContext";

function ProductPage() {
  // filters
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
  const [addCartMesssage, setAddCartMesssage] = useState(false);

  const { productCategory } = useParams();
  console.log("productCategory", productCategory);

  const [gender, setGender] = useState(
    productCategory === "All" ? ["Men", "Women", "Kids"] : [productCategory]
  );
  const [rating, setRating] = useState("all");
  const [range, setRange] = useState(0);
  const [sorted, setSorted] = useState("none");
  const [filteredData, setFilteredData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filterByGender, setFilterByGender] = useState([]);

  const { data, loading, error } = useFetch(
    "https://e-commerce-app-backend-seven.vercel.app/products"
  );

  useEffect(() => {
    if (productCategory === "All") {
      setGender([]);
    } else {
      setGender([productCategory]);
    }
  }, [productCategory]);

  useEffect(() => {
    if (data && data.products) {
      setAllProducts(data.products);
      setFilteredData(data.products);
    }
  }, [data]);

  useEffect(() => {
    filterData();
  }, [gender, rating, range, sorted, allProducts]);

  const filterData = () => {
    let filtered = allProducts;

    // Skip gender filter if productCategory is 'All'
    if (gender.length > 0 && !gender.includes("All")) {
      filtered = filtered.filter((prod) => gender.includes(prod.category));
      setFilterByGender(filtered);
    }

    // Filter by rating
    if (rating !== "all") {
      filtered = filtered.filter((prod) => prod.rating >= parseInt(rating));
    }

    // Filter by price range
    if (range !== 0) {
      filtered = filtered.filter((prod) => prod.price >= range);
    }

    // Sort products
    if (sorted === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sorted === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredData(filtered);
  };

  // TO get all values from Filter Form.
  const genderFilter = (e) => {
    const { value, checked } = e.target;
    setGender((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const ratingFilter = (e) => {
    setRating(e.target.value);
  };

  const rangeHandler = (e) => {
    setRange(parseInt(e.target.value));
    console.log("rangeHandler", parseInt(e.target.value));
  };

  const sorting = (e) => {
    setSorted(e.target.value);
  };

  //clear filter Form
  const clearFilter = () => {
    setGender([]);
    setRating("all");
    setRange(0);
    setSorted("none");
  };

  // Handle search term and filter products
  const handleSearch = (searchTerm) => {
    if (searchTerm == "") {
      setFilteredData(filterByGender);
    } else {
      const filtered = filteredData.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // for checking wishlist data
  useEffect(() => {
    setWishlistData(wishlist);
    if (filteredData.length > 0 && wishlistData.length > 0) {
      let matchedProducts = [];
      wishlistData.map((wishlistItem) => {
        const wishlistProductId = wishlistItem.productInfo?._id;
        if (wishlistProductId) {
          const matchingProduct = filteredData.find(
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
  }, [filteredData, wishlistData]);

  console.log("newStore wishlist data id same as product id:-", newStore);

  useEffect(() => {
    console.log("set Cart Store:---", cartList);
    setCartStoreData(cartList);
  }, [cartList]);
  console.log("cartStore:---", cartStoreData);

  useEffect(() => {
    if (filteredData.length > 0 && cartStoreData.length > 0) {
      let matchedProducts = [];
      cartStoreData.map((cartItem) => {
        const cartProductId = cartItem.productInfo?._id;
        if (cartProductId) {
          const matchingProduct = filteredData.find(
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
  }, [filteredData, cartStoreData]);
  console.log("setCartStore:::", cartStore);

  //*************** Delete product from cart ***************
  const deleteProductFromCartHandler = async (product) => {
    deleteProductFromCart(product);
    setDeleteAlert(true);
    setTimeout(() => setDeleteAlert(false), 1000);
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
                    border: "none",
                    background: "none",
                  }}
                >
                  Filters
                </button>
                <button
                  onClick={clearFilter}
                  id="clearFilterBtn"
                  className="fs-5 fw-medium"
                  style={{
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
                    onChange={genderFilter}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Men"
                    checked={gender.includes("Men")}
                  />
                  Men <br />
                  <input
                    onChange={genderFilter}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Women"
                    checked={gender.includes("Women")}
                  />
                  Women <br />
                  <input
                    onChange={genderFilter}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Kids"
                    checked={gender.includes("Kids")}
                  />
                  Kids
                  <br />
                </div>
                <br />
                <label htmlFor="customRange" className="fs-4 fw-medium">
                  Price Range:
                </label>
                <div
                  style={{ width: "86%" }}
                  className="m-0 ms-2 d-flex justify-content-between"
                >
                  {" "}
                  <span className="fs-5"> ₹ 1K</span>{" "}
                  <span className="fs-5">₹ 4K</span>{" "}
                  <span className="fs-5">₹ 7K</span>{" "}
                </div>
                <input
                  type="range"
                  className="form-range"
                  onChange={rangeHandler}
                  value={range}
                  min="1000"
                  max="7000"
                  step="200"
                  id="customRange"
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
                    checked={rating == 5}
                    onChange={ratingFilter}
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
                    checked={rating == 4}
                    onChange={ratingFilter}
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
                    checked={rating == 3}
                    onChange={ratingFilter}
                  />
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="2"
                    checked={rating == 2}
                    onChange={ratingFilter}
                  />
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  <i className="bi bi-star-fill text-warning"></i> <br />
                  <input
                    type="radio"
                    name="rating"
                    className="me-1 form-check-input"
                    value="1"
                    checked={rating == 1}
                    onChange={ratingFilter}
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
                    value="lowToHigh"
                    checked={sorted === "lowToHigh"}
                    onChange={sorting}
                  />
                  Price - Low to High
                  <br />
                  <input
                    type="radio"
                    name="sortBy"
                    className="me-1 form-check-input"
                    value="highToLow"
                    checked={sorted === "highToLow"}
                    onChange={sorting}
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
                {filteredData ? (
                  <div className="">
                    <h2>All Products</h2>
                    <div className="row py-3">
                      {/***************** map to display data  *****************/}
                      {filteredData.map((data) => (
                        <div
                          key={data._id}
                          className="col-md-6 col-lg-6 col-xl-4"
                        >
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

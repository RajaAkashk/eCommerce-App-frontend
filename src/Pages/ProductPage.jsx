import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import { Link, useParams } from "react-router-dom";

function ProductPage() {
  const [productsData, setProductsData] = useState(null);

  const productCategory = useParams();
  const category = productCategory.productCategory;

  console.log(category);

  const categoryUrl = `https://e-commerce-app-backend-seven.vercel.app/products/category/${category}`;

  const url = "https://e-commerce-app-backend-seven.vercel.app/products";


  const { data, loading, error } = useFetch(
    category !== "All" ? categoryUrl : url
  );

  useEffect(() => {
    if (data) {
      console.log("CATEGORY DATA:", data.products);
      setProductsData(data.products);
    }
  }, [data]);


  // filter  by rating
  // setProductsData(productsData);
      // console.log("requiredRating::", requiredRating);

    // let filteredByRating = [];
    // console.log("productsData:-", productsData);
  const productsRatingHandler = (event) => {
    const requiredRating = event.target.value;
    if (requiredRating) {
      const filteredByRating = [...productsData].filter(
        (data) => data.rating === parseInt(requiredRating)
      );
      console.log("filteredByRating:-", filteredByRating);
      setProductsData(filteredByRating);
    } else {
      setProductsData(productsData);
    }
  };

  //Sort by Price
  const SortPrice = (event) => {
    const sortOption = event.target.value;
    const sortedProducts = [...productsData].sort((a, b) =>
      sortOption === "Low to High" ? a.price - b.price : b.price - a.price
    );

    setProductsData(sortedProducts);
  };

  //Price range Hadler
  const rangeHadler = (event) => {
    const pproductPrice = event.target.value;
    console.log("price range :-", pproductPrice);
    if (pproductPrice) {
      const filteredByPrice = [...productsData].filter(
        (data) => data.price < pproductPrice
      );
      setProductsData(filteredByPrice);
    } else {
      setProductsData(productsData);
    }
  };


//Clothing category Handler
const categoryHandler = (event) => {
const {value,checked} = event.target;
let arr =[];
if(checked){
  arr.push(value)
}

}


  //error handling while fetching.
  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
        > 
        <p className="fs-1 text-danger fw-medium me-2">Opps! Some Error Ocuured</p>
      </div>
    );
  }

  return (
    <>
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
                    className="fs-5 fw-normal"
                    style={{
                      textDecoration: "underline",
                      border: "none",
                      background: "none",
                    }}
                  >
                    Clear
                  </button>
                </div>
                <br />

                <label for="customRange3" class="fs-4 fw-medium">
                  Price Range:
                </label>
                <p className="m-0">
                  {" "}
                  <span className="me-4 fs-5">₹ 1K</span>{" "}
                  <span className="mx-5 fs-5">₹ 3K</span>{" "}
                  <span className="mx-4 fs-5">₹ 7K</span>{" "}
                </p>
                <input
                  type="range"
                  class="form-range"
                  onChange={rangeHadler}
                  min="1000"
                  max="7000"
                  step="3000"
                  id="customRange3"
                  style={{ width: "86%" }}
                />

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
                    value="Men"
                  />
                  Men <br />
                  <input
                  onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Women"
                  />
                  Women <br />
                  <input
                  onChange={categoryHandler}
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="Kids"
                  />
                  Kids
                  <br />
                  <input
                    type="checkbox"
                    name="category"
                    className="me-1 form-check-input"
                    value="All"
                  />
                  All
                  <br />
                </div>
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

            {/**************** content side  ****************/}
            <div className="col-md-9 ">
              <div className="container py-4">
                {productsData ? (
                  <>
                    <h2>All Products</h2>
                    <div className="row py-3">
                      {/***** map to display data  *****/}
                      {productsData.map((data) => (
                        <div key={data._id} className="col-md-4">
                          <div
                            className="card position-relative mb-4"
                            style={{ borderRadius: "0px" }}
                          >
                            <i className="bi bi-heart position-absolute top-0 end-0 me-3 mt-2 fs-1"></i>
                            <img
                              src={data.productImg}
                              class="card-img-top"
                              alt="Clothing Image"
                              style={{
                                height: "15rem",
                                objectFit: "cover",
                                borderRadius: "0px",
                              }}
                            />
                            <div className="card-body text-center p-0">
                              <p className="card-title fs-5 fw-normal pt-3">
                                {data.name}
                              </p>
                              <p className="card-text py-0 px-3 fs-4 fw-medium">
                                ₹ {data.price}
                              </p>
                              <Link
                                to="#"
                                className="btn btn-danger text-light w-100 fs-5 fw-medium"
                                style={{ borderRadius: "0px" }}
                              >
                                Add to Cart
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  loading && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100vh" }}
                    >
                      <div class="spinner-border text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
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

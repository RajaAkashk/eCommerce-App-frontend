import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductDetailsPage() {
  const [productData, setProductData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [moreProducts, setMoreProducts] = useState();

  const dataId = useParams();
  console.log("DATA ID:-", dataId.productId);
  const selectedProductId = dataId.productId;
  //********* get Selected data  *********
  const { data, loading, error } = useFetch(
    `https://e-commerce-app-backend-seven.vercel.app/products/${selectedProductId}`
  );
  useEffect(() => {
    if (data) {
      console.log("selected ProductId Data:--", data.products);
      setProductData(data.products);
    }
  }, [data]);
  console.log("productData:-", productData);

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

  const handleIncrement = () => {
    if (quantity < 20) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
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
      {data ? (
        <>
          <section className="py-4">
            <div className="container bg-white">
              <div className="row p-4 py-5">
                <div className="col-md-4">
                  <div className="position-relative mb-4">
                    <i className="bi bi-heart position-absolute top-0 end-0 me-3 mt-2 fs-1"></i>
                    <img
                      src={productData.productImg}
                      alt="Clothing Image"
                      style={{
                        width: "100%",
                        height: "50vh",
                        objectFit: "cover",
                      }}
                    />{" "}
                    <div>
                      <Link
                        to="#"
                        className="btn btn-danger text-light w-100 fs-5 fw-medium mt-2"
                        style={{ borderRadius: "0px" }}
                      >
                        Buy Now
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-secondary text-light w-100 fs-5 fw-medium mt-2"
                        style={{ borderRadius: "0px" }}
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-8 px-5">
                  <div>
                    <h1>{productData.name}</h1>
                  </div>
                  <div className="pt-2">
                    <i class="bi bi-star-fill text-warning"></i>{" "}
                    <i class="bi bi-star-fill text-warning"></i>{" "}
                    <i class="bi bi-star-fill text-warning"></i>{" "}
                    <i class="bi bi-star-fill text-warning"></i>{" "}
                    <i class="bi bi-star-fill text-warning"></i> (
                    {productData.rating})
                  </div>
                  <h2 className="pt-4 text-danger">
                    ₹{" "}
                    {productData.price}
                  </h2>

                  <div className="pt-3 pb-2">
                    <span className="fs-5 fw-medium me-2">Quantity: </span>
                    <button
                      className="rounded bg-light"
                      onClick={handleIncrement}
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="rounded bg-light"
                      onClick={handleDecrement}
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                  </div>

                  <div className="d-flex py-4">
                    {" "}
                    <span className="fs-5 fw-medium me-2">Size:</span>
                    {productData.size?.map((data) => (
                      <button className="bg-light border rounded p-2 py-1 me-2">
                        {data}
                      </button>
                    ))}
                  </div>

                  <hr />
                  <div className="col-md-6">
                    <div className="d-flex justify-content-between">
                      <div className="text-center">
                        <i class="bi bi-box-seam fs-1"></i>
                        <p>
                          10 Days <br /> Returnable
                        </p>
                      </div>
                      <div className="text-center">
                        <i class="bi bi-cash-coin fs-1"></i>
                        <p>
                          Pay On <br /> Delivery
                        </p>
                      </div>
                      <div className="text-center">
                        <i class="bi bi-truck fs-1"></i>
                        <p>
                          Free <br /> Delivery
                        </p>
                      </div>
                      <div className="text-center">
                        <i class="bi bi-credit-card fs-1"></i>
                        <p>
                          Secure <br /> Payment
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <p className="fs-4 fw-medium mb-2">Description:</p>
                    <p className="fs-5">{productData.description}</p>
                  </div>
                </div>
              </div>
              <hr />
              <h3>More products you may interest</h3>

              <div
                className="py-3 d-flex"
                style={{ overflowX: "auto", gap: "1rem" }}
              >
                {/************************ view more products ************************/}
                {moreLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    //  style={{ height: "100vh" }}
                  >
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  moreProducts?.map((data) => (
                    <div key={data._id} className="col-md-3">
                      <div
                        className="card position-relative mb-4"
                        style={{ borderRadius: "0px" }}
                      >
                        <i className="bi bi-heart position-absolute top-0 end-0 me-3 mt-2 fs-1"></i>
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
                  ))
                )}
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

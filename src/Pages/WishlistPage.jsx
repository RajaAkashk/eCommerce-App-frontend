import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import StarRating from "../Components/StarRating";

const WishlistPage = () => {
  const [wishlist, setWishList] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const { data, loading, error } = useFetch(
    `https://e-commerce-app-backend-seven.vercel.app/wishlist/products`
  );

  useEffect(() => {
    if (data) {
      console.log("WishlistPage:-", data.products);
      setWishList(data.products);
    }
  }, [data]);

  if (error) {
    return (
      <p className="text-center py-5 fs-4 fw-medium text-danger">
        Error loading wishlist {error.message}
      </p>
    );
  }

  const removeFromWishlist = async (product) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-backend-seven.vercel.app/product/delete/${product._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Deleted successfully.");
        setWishList(
          wishlist.filter((data) => data.productInfo._id != product._id)
        );
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      } else {
        console.log("Failed to delete the item from wishlist.");
      }
    } catch (error) {
      console.log("Error in deleteing data.", error);
    }
  };

  return (
    <>
      {/* <Header wishlist={wishlist}/> */}
      <Header />
      <section className="py-5">
        <div className="container">
          <div className="row">
            {showAlert && (
              <div className="alert alert-success text-center" role="alert">
                <span className="fs-5 fw-medium">SuccessFully Deleted</span>
              </div>
            )}
            {data
              ? wishlist?.map((data) => (
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
                      {/************ add to wishlist btn  ************/}
                      <i
                        onClick={() => removeFromWishlist(data.productInfo)}
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

import React from "react";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../Components/StarRating";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-app-backend-seven.vercel.app/order/history"
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Order History data", data.orders);
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="container py-4">
          <div>
            <h1 className="mb-4">Order History</h1>
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "10vh" }}
              >
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="list-group">
                {orders.map((order) => (
                  <li key={order._id} className="list-group-item p-4">
                    <p className="fs-5">
                      <strong>Order Date: </strong>
                      {new Date(parseInt(order.orderData)).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                    <p className="fs-5">
                      <strong>Total Price:</strong> ₹
                      {order.totalAmount.toFixed(2)}
                    </p>
                    <p className="fs-5">
                      <strong>Address:</strong> {order.address}
                    </p>
                    <div className="row flex-wrap ">
                      {order.productInfo.map((product, index) => (
                        // <li key={index} className="list-group-item">
                        //   {product.product.name} - {product.product.quantity} x
                        //   ₹{product.product.price.toFixed(2)}
                        // </li>
                        // <li key={index} className="list-group-item d-flex flex-wrap">
                        <div className="col-md-3 col-12">
                          <div className="card mt-3">
                            <img
                              src={product.product.productImg}
                              className="card-img-top"
                              style={{ height: "15rem", objectFit: "cover" }}
                              alt={product.product.name}
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {product.product.name}
                              </h5>
                              <p className="card-text">
                                <strong>Category:</strong>{" "}
                                {product.product.category}
                                <br />
                                <strong>Size:</strong>{" "}
                                {product.product.selectedSize}
                                <br />
                                <strong>Price:</strong> ₹
                                {product.product.price.toFixed(2)}
                                <br />
                                <strong>Quantity:</strong>{" "}
                                {product.product.quantity}
                                <br />
                                {/* <strong>Rating:</strong>{" "}
                                {product.product.rating} */}
                                {/* <StarRating rating={product.product.rating} /> */}
                              </p>
                              <Link
                                to={`/productsPage/${product.product._id}`}
                                className="btn btn-danger w-100"
                              >
                                View Product
                              </Link>
                            </div>
                          </div>
                        </div>
                        // </li>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Display error message if there is an error */}
            {Error && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "10vh" }}
              >
                <h2 className="text-danger fs-4 fw-medium">
                  Failed to fetch order history
                </h2>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderHistoryPage;

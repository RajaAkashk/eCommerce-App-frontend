import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useContext } from "react";
import { AddressContext } from "../Contexts/AddressContext";
import { CartContext } from "../Contexts/CartContext";
import { Link } from "react-router-dom";

function CheckoutPage() {
  const [message, setMessage] = useState(false);
  const [ChoosenAddress, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { userInfo, getUserInfo, getAllAddress, address, updateUserAddress } =
    useContext(AddressContext);
  const { cartList, deleteAllProductsFromCart } = useContext(CartContext);

  useEffect(() => {
    getUserInfo();
    getAllAddress();
  }, [getUserInfo, getAllAddress]);

  const totalPrice = cartList.reduce(
    (acc, curr) =>
      acc +
      parseInt(curr.productInfo.quantity) * parseInt(curr.productInfo.price),
    0
  );
  const checkoutHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/cart/order/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: ChoosenAddress,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Error in checking out", data);
        return;
      }

      console.log("Successfully checked out", data);
      await deleteAllProductsFromCart();

      setLoading(false);
      setMessage(true);
    } catch (error) {
      console.error("Checkout or cart clearing failed:", error);
      alert("Failed to complete checkout. Please try again.");
    }
  };

  const updateUserAddressHandler = (e) => {
    const updatedAddress = e.target.value;
    console.log("updated Address :-", updatedAddress);

    const userId = userInfo[0]._id;
    console.log("USER ID :-", userId);
    updateUserAddress(userId, updatedAddress);
    console.log("Address:", ChoosenAddress);
    setAddress(updatedAddress);
    // setUpdateMessage(true);
    // setTimeout(() => setUpdateMessage(false), 1000);
  };

  return (
    <>
      <Header />
      <main className="container d-flex justify-content-center py-5 ">
        <div className="border p-4 rounded border-2 orderSummaryBox">
          {/* Show confirmation message or order summary */}
          {message ? (
            <div className="text-center">
              <h1 className="text-success">Your Order Has Been Placed!</h1>
              <p className="fs-5">
                Thank you for shopping with us. Your items will be delivered in
                2-3 working days.
              </p>
              <Link className="btn btn-danger fs-5" to="/products/All">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-center display-5 mb-4 pb-lg-4 text-danger border-bottom border-danger">
                Order Summary
              </h1>

              <div>
                {userInfo.map((data) => (
                  <div key={data.id}>
                    {" "}
                    {/* Ensure unique key for each element */}
                    <p className="fs-5">
                      <strong>Name: </strong> {data.name}
                    </p>
                    <p className="fs-5">
                      <strong>Email: </strong> {data.email}
                    </p>
                    <p className="fs-5">
                      <strong>Number: </strong> (+91) {data.phoneNumber}
                    </p>
                  </div>
                ))}
                {/* for selecting an address  */}
                <label className="fs-5 fw-bold" htmlFor="selectAddress">
                  Select one shipping address:
                </label>
                <select
                  id="selectAddress"
                  className="form-select my-3"
                  name="address"
                  value={ChoosenAddress}
                  onChange={updateUserAddressHandler}
                >
                  {address.length === 0 ? (
                    <option>
                      <div className="text-center">
                        <div
                          className="spinner-border text-danger"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </option>
                  ) : (
                    <>
                      <option value="">Select</option>
                      {address.map((data) => (
                        <option
                          key={data._id}
                          value={`${data.houseNumber}, ${data.street}, ${data.city}, ${data.state}, ${data.zipcode}`}
                        >
                          {`${data.houseNumber}, ${data.street}, ${data.city}, ${data.state}, ${data.zipcode}`}
                        </option>
                      ))}
                    </>
                  )}
                </select>

                <p className="fs-5">
                  <strong>Total items to be delivered: </strong>
                  {cartList.reduce(
                    (acc, curr) => acc + parseInt(curr.productInfo.quantity),
                    0
                  )}{" "}
                  items
                </p>
                <p className="fs-5">
                  <strong>Total price of items: </strong>
                  <i className="bi bi-currency-rupee"></i>
                  {totalPrice}
                  {totalPrice > 5000 ? (
                    <span className="fs-5 fw-medium text-success mx-2">
                      (<i className="bi bi-check-lg"></i>Eligible for free
                      delivery )
                    </span>
                  ) : (
                    <span className="fs-5">
                      <strong> +</strong> Delivery charges(
                      <i className="bi bi-currency-rupee"></i>200)
                      <br />
                    </span>
                  )}
                </p>
                {totalPrice < 5000 && (
                  <>
                    <p className="fs-5">
                      <span>
                        {" "}
                        <strong className="">Sub Total: </strong>{" "}
                        <i className="bi bi-currency-rupee"></i>
                        {totalPrice + 200}
                      </span>
                    </p>
                  </>
                )}
                <p className="fs-5">
                  <strong>Mode Of Payment: </strong> Cash On Delivery
                </p>
                <p className="fs-5 fw-bold">
                  Order will be delivered in 2-3 working days.
                </p>
              </div>

              {/* Checkout Button */}
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger fs-5"
                  onClick={() => {
                    if (ChoosenAddress === "") {
                      alert("Please select one address");
                    } else {
                      checkoutHandler();
                    }
                  }}
                  disabled={ChoosenAddress === "" || loading}
                >
                  {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default CheckoutPage;

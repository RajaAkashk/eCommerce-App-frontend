import React, { useState } from "react";
import Header from "../Components/Header";

function UserPage() {
  const [address, setAddress] = useState("XYZ");

  const selectAddressHandler = (event) => {
    const selectedAddress = event.target.value;
    console.log(selectedAddress);
    setAddress(selectedAddress);
  };

  const addressFormHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row justify-content-between">
          <div className="col-md-4 text-center">
            <div className="rounded p-4 border">
              <img
                src="https://placehold.co/600x600?text=User+Profile"
                className="col-md-8 mb-4 rounded-circle"
                alt="User Profile"
              />
              <p className="fs-5">
                <strong>Name: </strong>Raj Kumar
              </p>
              <p className="fs-5">
                <strong>Email: </strong>RajKumar@gmail.com
              </p>
              <p className="fs-5">
                <strong>Phone Number: </strong>9999785457
              </p>
              <p className="fs-5">
                <strong>Address: </strong>
                {address}
              </p>

              <div className="mt-5">
                <h2>Select One Address</h2>
                <div className="mb-3">
                  <label htmlFor="selectAddress" className="form-label"></label>
                  <select
                    className="form-select"
                    id="selectAddress"
                    onChange={(event) => selectAddressHandler(event)}
                  >
                    <option value="">Choose...</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="border rounded p-4">
              <h1 className="mb-4">Add Address</h1>
              <form onSubmit={addressFormHandler}>
                {/* Name */}
                {/* Address Line 1 */}
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">
                    House Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    placeholder="123"
                  />
                </div>

                {/* City */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter your city"
                  />
                </div>

                {/* State */}
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input className="form-control" type="text" id="state" />
                </div>

                {/* Zip Code */}
                <div className="mb-3">
                  <label htmlFor="zipCode" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    placeholder="12345"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-danger fs-5 w-100">
                  Add Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserPage;

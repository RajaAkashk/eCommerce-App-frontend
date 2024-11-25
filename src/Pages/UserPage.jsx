import React, { useContext, useState, useEffect } from "react";
import Header from "../Components/Header";
import { AddressContext } from "../Contexts/AddressContext";

function UserPage() {
  const [ChoosenAddress, setAddress] = useState("");
  const [alert, setAlert] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(false);

  // context
  const {
    addUserAddress,
    address,
    userInfo,
    updateUserAddress,
    getAllAddress,
    deleteAddress,
    loading,
    error,
  } = useContext(AddressContext);

  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  console.log("userInfo :::::-", userInfo);

  // getting all the address data and show it with help of address state.
  useEffect(() => {
    getAllAddress();
  }, []);

  const addressFormHandler = (e) => {
    e.preventDefault();

    const newAddress = {
      houseNumber: houseNumber,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
    };

    // Adding new address
    if (
      newAddress.houseNumber &&
      newAddress.street &&
      newAddress.state &&
      newAddress.zipcode
    ) {
      addUserAddress(newAddress);
      // getAllAddress();
      setAlert(true);
      setTimeout(() => setAlert(false), 1500);
    }

    setHouseNumber("");
    setCity("");
    setStreet("");
    setState("");
    setZipcode("");
  };

  const updateUserAddressHandler = (e) => {
    const updatedAddress = e.target.value;
    console.log("updated Address :-", updatedAddress);

    const userId = userInfo[0]._id;
    console.log("USER ID :-", userId);
    updateUserAddress(userId, updatedAddress);

    setAddress(updatedAddress);
    setUpdateMessage(true)
    setTimeout(() => setUpdateMessage(false), 1000)
  };

  const deleteAddressHandler = (addressId) => {
    setDeleteMessage(true);
    setTimeout(() => {
      setDeleteMessage(false);
    }, 1000);
    deleteAddress(addressId);
    console.log("Address Deleted Successfully.");
  };

  if (error) {
    return (
      <div className="d-flex justify-content-center vh-100">
        <p className="text-danger fs-2 fw-bold">Error in getting user data!</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row justify-content-between">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="row g-0 py-2 px-4">
                {loading ? (
                  <div className="text-center">
                    <div class="spinner-border text-danger" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {userInfo?.map((user) => (
                      <>
                        <div className="col-md-4 d-flex align-items-center">
                          <img
                            src={`${user.profile}`}
                            style={{
                              width: "9.9rem",
                              height: "9.9rem",
                              objectFit: "cover",
                            }}
                            className="img-fluid rounded-circle"
                            alt="User Profile"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h2 className="card-title">{user.name}</h2>
                            <p className="card-text fs-5">
                              <strong>Email: </strong>
                              {user.email}
                            </p>
                            <p className="card-text fs-5">
                              <strong>Phone Number: </strong> (+91){" "}
                              {user.phoneNumber}
                            </p>
                            <p className="card-text fs-5">
                              <strong>Address:</strong>{" "}
                              {ChoosenAddress ? ChoosenAddress : user.address}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                )}
                <div className="mt-4 text-center">
                  <h2 className="m-0 p-0">Choose one Address</h2>
                  {(deleteMessage || updateMessage )&& (
                    <div class="alert alert-success text-center" role="alert">
                      <span className="fs-5">
                       {deleteMessage && "Successfully Deleted Address"}
                       {updateMessage && "New Address Added"}
                        </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <ul className="list-group my-3">
                      {address.length == 0 ? (
                        <li className="list-group-item">
                          <div className="text-center">
                            <div
                              class="spinner-border text-danger"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        </li>
                      ) : (
                        address.map((data) => (
                          <li
                            key={data._id}
                            className="list-group-item d-flex justify-content-between"
                          >
                            <input
                              onChange={updateUserAddressHandler}
                              type="radio"
                              name="address"
                              value={`${data.houseNumber}, ${data.street}, ${data.city}, ${data.state}, ${data.zipcode}`}
                              checked={
                                // userInfo.filter((data) => data.address) ||
                                ChoosenAddress ===
                                `${data.houseNumber}, ${data.street}, ${data.city}, ${data.state}, ${data.zipcode}`
                              }
                            />
                            <span className="mt-2">{`${data.houseNumber}, ${data.street}, ${data.city}, ${data.state}, ${data.zipcode}`}</span>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteAddressHandler(data._id)}
                            >
                              Delete
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="border rounded p-4">
              <h1 className="mb-4 text-center">Add Address</h1>
              <form onSubmit={addressFormHandler}>
                {alert && (
                  <div class="alert alert-success text-center" role="alert">
                    <span className="fs-5">New Address Added !</span>
                  </div>
                )}
                {/* House number */}
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">
                    House Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    required
                    onChange={(e) => setHouseNumber(e.target.value)}
                    value={houseNumber}
                    placeholder="e.g E-012"
                  />
                </div>

                {/* Street */}
                <div className="mb-3">
                  <label htmlFor="Street" className="form-label">
                    Street
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Street"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Enter your Street"
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
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>

                {/* State */}
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    className="form-control"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                    id="state"
                    required
                    placeholder="e.g Delhi"
                  />
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
                    required
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="e.g 12345"
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

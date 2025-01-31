import React, { createContext, useEffect, useState } from "react";
import useFetch from "../useFetch";

const AddressContext = createContext();

const AddressContextProvider = ({ children }) => {
  const [address, setAddress] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  // To get user info
  const { data, loading, error } = useFetch(
    "https://e-commerce-app-backend-seven.vercel.app/get/user/info"
  );
  useEffect(() => {
    if (data) {
      console.log("User Info Data :- ", data.user);
      setUserInfo(data.user);
    }
  }, [data]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/get/user/info"
      );

      if (!response.ok) {
        console.log("error in getting response");
      }

      const data = await response.json();
      setUserInfo(data.user);
    } catch (error) {
      console.log("Failed to get data from database.");
    }
  };

  const getAllAddress = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/get/user/all/address"
      );
      if (!response.ok) {
        console.log("Not getting the response from address backend.");
      }

      const data = await response.json();
      setAddress(data.data);
    } catch (error) {
      console.log("error in getting all the data form address backend.", error);
    }
  };

  // To Add a new address
  const addUserAddress = async (userAddress) => {
    try {
      const response = await fetch(
        "https://e-commerce-app-backend-seven.vercel.app/user/address/new",
        {
          method: "POST",
          body: JSON.stringify(userAddress),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Error in getting response.");
      }
      const data = await response.json();
      console.log("Successfully Added New Address :-", data);
      await getAllAddress();
    } catch (error) {
      console.log("Error While Adding User Address via Form.", error);
    }
  };

  // To Update User Address
  const updateUserAddress = async (userId, updatedAddress) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-backend-seven.vercel.app/update/user/${userId}`,
        {
          method: "POST",
          body: JSON.stringify({ address: updatedAddress }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("Error in updating address.");
        return;
      }

      const data = await response.json();
      console.log("Address updated successfully:", data);
    } catch (error) {
      console.log("Error while updating address:", error);
    }
  };

  // To delete Address
  const deleteAddress = async (addressId) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-backend-seven.vercel.app/user/info/address/delete/${addressId}`,
        { method: "DELETE" }
      );
      console.log("response:-", response);
      if (!response.ok) {
        console.log(
          "Error in getting response from address database to delete function."
        );
      }
      const data = await response.json();

      setAddress(address.filter((data) => data._id !== addressId));

      console.log("Deleted from address database.", data);
    } catch (error) {
      console.log("Error in deleting address from address database.", error);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addUserAddress,
        address,
        userInfo,
        updateUserAddress,
        getAllAddress,
        deleteAddress,
        getUserInfo,
        loading,
        error,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export { AddressContext, AddressContextProvider };

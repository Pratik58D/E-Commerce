import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Form from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/address.slice";
import { toast } from "react-toastify";
import AddressCard from "./AddressCard";

const initalFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initalFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);

  const handleMangeAddress = (event) => {
    event.preventDefault();
    if(addressList.length >= 3 && currentEditedId === null ){
      setFormData(initalFormData)
      toast.error("You can add max 3 addresses");
      return
    }
    if (currentEditedId !== null ) {
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      ).then((data) => {
       
        if (data?.payload?.success) {
        // console.log("updated data",data)
          dispatch(fetchAllAddress(user?.id));
          setCurrentEditedId(null);
          setFormData(initalFormData)
          toast.success("Address updated successfully");
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id));
          setFormData(initalFormData);
          toast.success("Address info added");
        }
      });
    }
  };

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
  }

  function handleDeleteAddress(getCurrentAddress) {
    // console.log(getCurrentAddress )
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast.success("Address Deleted");
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                addressInfo={singleAddressItem}
                handleDeleteAddress={handleDeleteAddress}
                key={singleAddressItem._id}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Update" : "Add"}
          onSubmit={handleMangeAddress}
        />
      </CardContent>
    </Card>
  );
};

export default Address;

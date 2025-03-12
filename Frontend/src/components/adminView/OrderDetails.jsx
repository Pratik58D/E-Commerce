import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import Form from "../common/Form";
import { Separator } from "../ui/separator";

const initialFormData = {
  status: "",
};

const dataForForm = [
  {
    label: "Order Status",
    name: "status",
    componentType: "select",
    options: [
      { id: "pending", label: "Pending" },
      { id: "inProcess", label: "In Process" },
      { id: "inShipping", label: "In Shipping" },
      { id: "delivered", label: "Delivered" },
      { id: "rejected", label: "Rejected" },
    ],
  },
];

const OrderDetails = () => {
  const [formData, setFormData] = useState(initialFormData);
  const handleUpdateStatus = (e) => {
    e.preventDefault();
      // Ensure state only updates when there's an actual change
  if (formData.status) {
    console.log("Updating order status:", formData.status);
  }


  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-4">
        <div className="grid gap-1">
          <div className="flex mt-4 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>12/12/2056</Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order price</p>
            <Label>$444</Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>In Progress</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-3">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Title: </span>
                <span>Quantity: </span>
                <span>Price: </span>
              </li>
            </ul>
          </div>
        </div>
        <Separator />
        <div className="grid gap-3">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Pratik Devkota</span>
              <span>Address</span>
              <span>Pin Code</span>
              <span>Phone</span>
              <span>notes</span>
            </div>
          </div>
        </div>
        <div>
          <Form
            formControls={dataForForm}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default OrderDetails;

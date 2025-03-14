import React from "react";
import image from "../../assets/account.avif";
import Address from "@/components/shoppingView/Address";
import { useSelector } from "react-redux";
import UserCartItemContent from "@/components/shoppingView/CartItemContent";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salesPrice > 0
              ? currentItem?.salesPrice
              : currentItem?.price) *
              currentItem?.quantity,
          0 //intial value of accumulator
        )
      : 0;

      const handlePayment= (e)=>{
        e.preventDefault();
        const paymentData = {
          amt: totalCartAmount, // Total amount from cart
          psc: 0, // Service charge
          pdc: 0, // Delivery charge
          txAmt: 0, // Tax amount
          tAmt: totalCartAmount, // Total payable amount
          pid: `ORDER_${Date.now()}`, // Unique transaction ID
          scd: "EPAYTEST", // eSewa Merchant Code (Test)
          su: "http://localhost:7000/api/esewa/payment-success", // Success URL (Backend)
          fu: "http://localhost:5000/api/esewa/payment-failure", // Failure URL (Backend)
      }

      // Create form and submit it to eSewa
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    Object.keys(paymentData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={image} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemContent cartItem={item} />
              ))
            : null}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold ">Total</span>
              <span className="font-bold ">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button 
            onClick = {handlePayment}
            className="bg-green-500 hover:bg-green-800 w-full">Checkout with Esewa</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

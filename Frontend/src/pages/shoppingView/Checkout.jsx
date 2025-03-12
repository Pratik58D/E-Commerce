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
            <Button className="bg-green-500 hover:bg-green-800 w-full">Checkout with Esewa</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

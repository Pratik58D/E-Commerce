import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemContent from "./CartItemContent";


const UserCartWrapper = ({ cartItems }) => {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salesPrice > 0
              ? currentItem?.salesPrice
              : currentItem?.price) *
              currentItem?.quantity,
               0   //intial value of accumulator
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, key) => (
              <UserCartItemContent key={key} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold ">Total</span>
          <span className="font-bold ">${totalCartAmount.toFixed(2)}</span>
        </div>
        <Button className="w-full mt-6">CheckOut</Button>
      </div>
    </SheetContent>
  );
};

export default UserCartWrapper;

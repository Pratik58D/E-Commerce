import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCart } from "@/store/shop/cart.slice";
import { toast } from "react-toastify";

const UserCartItemContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //handle delete cart item   //cartitem in this component is cartItem.itemms in backend
  function handleCartItemDelete(cartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: cartItem?.productId })
    ).then((data)=>{
      if(data?.payload?.success){
        toast.error("cart Item Deleted")
      }
    })
  }

  //handles the update 
  function handleUpdateQuantity(cartItem, typeofupdate) {
    dispatch(
      updateCart({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          typeofupdate === "add"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("cart Item is updated successfully");
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled = {cartItem ?.quantity == 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">minus</span>
          </Button>
          <span>{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "add")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">add</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p>
          $
          {(
            (cartItem?.salesPrice > 0 ? cartItem.salesPrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemContent;

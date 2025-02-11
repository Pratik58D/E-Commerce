import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const ProductTile = ({
  product,
  setCurrentEditedId,
  setOpenCreateProductDialog,
  setFormData,
  handleDelete
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto ">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-32 sm:h-48 md:h-60 lg:h-72 xl:h-80 object-contain rounded-t-lg"
          />
        </div>
        <CardContent>
          <div className="flex justify-between capitalize mb-2 mt-2">
            <h2 className="text-xl font-semibold">{product?.title}</h2>
            <h2 className="text-md font-semibold ">{product?.brand}</h2>
            <h2 className="text-md font-semibold ">{product?.category}</h2>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg font-semibold text-primary ${
                product?.salesPrice > 0 ? "line-through " : ""
              }`}
            >
              NPR: {product?.price}
            </span>
            {/* render only if there is salesPrice */}
            {product?.salesPrice > 0 ? (
              <span className="text-lg font-bold ">
                NPR: {product?.salesPrice}
              </span>
            ) : (
              ""
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick ={()=>handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductTile;

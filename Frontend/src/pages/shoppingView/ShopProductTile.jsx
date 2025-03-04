import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

const ShopProductTile = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto">
        <div onClick={() => handleGetProductDetails(product?._id)}>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-52 object-cover rounded-t-lg"
            />
            {product?.salesPrice > 0 ? (
              <Badge 
              className="absolute top-2 left-2 bg-red-500 hover:bg-red-800">
                Sale
              </Badge>
            ) : null}
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-center mb-2 capitalize ">
              {product?.title}
            </h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground capitalize ">
                {product?.category}
              </span>
              <span className="text-sm text-muted-foreground capitalize ">
                {product?.brand}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-lg text-primary font-semibold ${
                  product?.salesPrice > 0 ? "line-through" : ""
                } `}
              >
                {product?.price}
              </span>
              {product?.salesPrice > 0 ? (
                <span className="text-lg text-primary font-semibold ">
                  {product?.salesPrice}
                </span>
              ) : null}
            </div>
          </CardContent>
        </div>
        <CardFooter>
          <Button
            onClick={() => handleAddtoCart(product?._id)}
            className="w-full"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShopProductTile;

import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div>
            <div>
              <h1 className="text-3xl font-bold capitalize">
                {productDetails?.title}
              </h1>
              <p className="text-muted-foreground mt-4 mb-4">
                {productDetails?.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-semibold ${
                  productDetails?.salesPrice > 0
                    ? "line-through "
                    : "text-primary"
                }  `}
              >
                {productDetails?.price}
              </p>
              {productDetails?.salesPrice > 0 ? (
                <p className="text-2xl font-bold text-muted-foreground">
                  ${productDetails?.salesPrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
              </div>
              <span className="text-muted-foreground">(4.5)</span>
            </div>

            <div className="mt-4 mb-4">
              <Button className="w-full">Add to Cart</Button>
            </div>
            <Separator />
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-5">Reviews</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border-2 rounded-full ">
                    <AvatarFallback>PD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Pratik Devkota</h3>
                    </div>
                    <div className="flex items-center gap-0.5 ">
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                    </div>

                    <p className="text-muted-foreground">
                      This is awesome Product
                    </p>
                  </div>

                  
                </div>
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border-2 rounded-full ">
                    <AvatarFallback>PD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Pratik Devkota</h3>
                    </div>
                    <div className="flex items-center gap-0.5 ">
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                    </div>

                    <p className="text-muted-foreground">
                      This is awesome Product
                    </p>
                  </div>

                  
                </div>
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border-2 rounded-full ">
                    <AvatarFallback>PD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Pratik Devkota</h3>
                    </div>
                    <div className="flex items-center gap-0.5 ">
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                    </div>

                    <p className="text-muted-foreground">
                      This is awesome Product
                    </p>
                  </div>

                  
                </div>
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border-2 rounded-full ">
                    <AvatarFallback>PD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Pratik Devkota</h3>
                    </div>
                    <div className="flex items-center gap-0.5 ">
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                      <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                    </div>

                    <p className="text-muted-foreground">
                      This is awesome Product
                    </p>
                  </div>

                  
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Input placeholder= "write a review...."/>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailsDialog;

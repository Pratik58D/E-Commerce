import ImageUpload from "@/components/adminView/Image-Upload";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductsFormElements } from "@/config";
import React, { useState } from "react";

const intialFormData = {
  image: null,
  title: "",
  description: "",
  price: 0,
  brand: "",
  salePrice: "",
  totalStock: "",
};

const AdminProduct = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(intialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          {" "}
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => setOpenCreateProductDialog(false)}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
            />
            <div className="py-6">
              <Form
                formControls={addProductsFormElements}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText="Create Product"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminProduct;

import ImageUpload from "@/components/adminView/Image-Upload";
import ProductTile from "@/components/adminView/ProductTile";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductsFormElements } from "@/config";
import { createProduct, getProducts } from "@/store/admin/product.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedID , setCurrentEditedId] = useState(null)
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  //this will get the products from backend
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // console.log("product list:", productList);
  // console.log("updated url :", uploadedImageUrl);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      console.log("data is: ", data);
      if(data.payload.success) {
        dispatch(getProducts());
        toast.success(data.payload.message);
        setImageFile(null);
        setFormData(intialFormData);
        setOpenCreateProductDialog(false);
      }else{
        toast.error(data.payload.message)
        setOpenCreateProductDialog(false)
        setImageFile(null);
        setFormData(intialFormData);
      }
    });
  };

  return (
    <>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          {" "}
          Add New Product
        </Button>
      </div>
      {/* it shows the products in page */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList.map((product)=>(
            <ProductTile product={product} setCurrentEditedId= {setCurrentEditedId} setOpenCreateProductDialog = {setOpenCreateProductDialog} setFormData= {setFormData} />
          ))

        }
        </div>

        {/* for dialogs or modals */}
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() =>{
           setOpenCreateProductDialog(false)
           setCurrentEditedId(null)
           setFormData(intialFormData)
          
          }}
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
              setImageLoading={setImageLoading}
              imageLoading={imageLoading}
              isEditMode = {currentEditedID !== null}
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
      
    </>
  );
};

export default AdminProduct;

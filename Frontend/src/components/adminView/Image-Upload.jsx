import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoading,
  setImageLoading,
  isEditMode
}) => {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {
    // console.log(e.target.files);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  //updated url 

  const uploadImageToCloudinary = async () => {
    try {
      setImageLoading(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        "http://localhost:7000/api/admin/product/upload-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      if (response) setUploadedImageUrl(response.data?.imageUrl);
      // console.log("url link",uploadedImageUrl);
      setImageLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto pt-3">
      <label className="text-md font-medium mb-2 block">Image-Upload</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          ref={inputRef}
          className="hidden"
          id="image-upload"
          type="file"
          onChange={handleImageFileChange}
          disabled = {isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : ""}flex flex-col items-center justify-center h-32 cursor-pointer `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Upload the image.</span>
          </Label>
        ) : // imaging loading
        imageLoading ? (
          <Skeleton className="h-10 bg-gray-500" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-7 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium mr-2">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

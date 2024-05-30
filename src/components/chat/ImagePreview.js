import React from "react";

const ImagePreview = ({ image }) => {
  if (!image) return null;

  const imageUrl = URL.createObjectURL(image);
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="relative">
        <img
          src={imageUrl}
          alt="Image Preview"
          className="w-32 h-32 object-cover rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default ImagePreview;

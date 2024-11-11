import React, { useContext, useState } from "react";
import { ProductContext } from "./ProductContext";
import { useNavigate } from "react-router-dom";
import HzNavbar from "../Components/HzNavbar";

const Description = () => {
  const { saveProductDetails, categories } = useContext(ProductContext); // Use saveProductDetails from context
  const navigate = useNavigate();

  // State variables to hold product details
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setPreview(reader.result);
        setImage(reader.result); // Save image data in context
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setProductName("");
    setCategory("shoes");
    setBrand("");
    setImage(null);
    navigate("/"); // Navigate to home or main page
  };

  const handleNext = () => {
    saveProductDetails({ productName, category, brand, image });
    navigate("/variants");
  };

  return (
    <div className="container">
      <div className="twoButtons">
        <button type="button" className="btn_1" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="btn_2" onClick={handleNext}>
          Next
        </button>
      </div>

      <HzNavbar />

      <div className="boxForProductForm">
        <h4>Description</h4>

        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)} // Update productName state
          />

          <label htmlFor="category">Category:</label>
          <div>
            <select
              value={category}
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)} // Update brand state
          />

          <label htmlFor="imageUpload">Upload Image:</label>
          <div>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {/* {preview && <img src={preview} alt="Preview" />} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Description;

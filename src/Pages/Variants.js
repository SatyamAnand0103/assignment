import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";
import HzNavbar from "../Components/HzNavbar";
import { useNavigate } from "react-router-dom";

const Variants = () => {
  const navigate = useNavigate();
  const { saveProductDetails } = useContext(ProductContext); // Access function from context
  const [selectedSize, setSelectedSize] = useState(""); // State for size
  const [selectedColor, setSelectedColor] = useState(""); // State for color

  const handleBack = () => {
    navigate("/description");
  };

  const handleNext = () => {
    saveProductDetails({
      size: selectedSize, 
      color: selectedColor, 
    });
    navigate("/PriceInfo");
  };

  // Define available variants
  const sizes = ["Small", "Medium", "Large", "Extra Large"];
  const colors = ["Red", "Blue", "Green", "Black", "White"];

  return (
    <div className="container">
      <div className="twoButtons">
        <button type="button" className="btn_1" onClick={handleBack}>
          Back
        </button>
        <button type="button" className="btn_2" onClick={handleNext}>
          Next
        </button>
      </div>
      <HzNavbar />

      <div className="boxForProductForm">
        <h4>Variants</h4>

        <span id="sizeLabel">
          <label htmlFor="size">Size :</label>
        </span>
        <select
          id="selectSize"
          value={selectedSize}
          onChange={(event) => {
            setSelectedSize(event.target.value);
          }}
        >
          <option value="">Select Size</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <span id="colorLabel">
          <label htmlFor="color">Color :</label>
        </span>
        <select
          id="selectColor"
          value={selectedColor}
          onChange={(event) => {
            setSelectedColor(event.target.value);
          }}
        >
          <option value="">Select Color</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Variants;

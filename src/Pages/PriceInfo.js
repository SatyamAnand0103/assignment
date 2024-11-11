import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { useNavigate } from "react-router-dom";
import HzNavbar from "../Components/HzNavbar";

const PriceInfo = () => {
  const { savePriceInfo, productDetails, addCategory } =
    useContext(ProductContext); // Get the function from context
  const navigate = useNavigate();

  // State variables using useState
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("%");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const handleDiscountTypeChange = (type) => {
    setDiscountType(type);
  };

  const handleConfirm = () => {
    savePriceInfo(price, discount, discountType, image, size, color);

    const newProduct = {
      name: productDetails.category,
      productName: productDetails.productName,
      brand: productDetails.brand,
      image: productDetails.image,
      size: productDetails.size,
      color: productDetails.color,
      price,
      discount,
      discountType,
    };

    addCategory(newProduct);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="twoButtons">
        <button
          type="button"
          className="btn_1"
          onClick={() => navigate("/variants")}
        >
          Back
        </button>
        <button type="button" className="btn_2" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
      <HzNavbar />

      <div className="boxForProductForm">
        <h2>Price Info</h2>
        <div className="input-group">
          <label htmlFor="price">Price *</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="₹ 12000"
          />
        </div>
        <div className="input-group">
          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="12"
          />
          <div className="discount-type-buttons">
            <button
              className={`discount-type-btn ${
                discountType === "%" ? "active" : ""
              }`}
              onClick={() => handleDiscountTypeChange("%")}
            >
              %
            </button>
            <button
              className={`discount-type-btn ${
                discountType === "$" ? "active" : ""
              }`}
              onClick={() => handleDiscountTypeChange("$")}
            >
              $
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;

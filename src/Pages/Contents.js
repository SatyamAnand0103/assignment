import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";

const Contents = () => {
  const {
    productDetails,
    price,
    discount,
    discountType,
    categories,
    addCategory,
  } = useContext(ProductContext);

  const [showCategoryBox, setShowCategoryBox] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleCategory = () => setShowCategoryBox(true);

  const closePopup = () => {
    setCategoryName("");
    setShowCategoryBox(false);
  };

 

  const handleProduct = () => navigate("/description");

  const saveCategory = () => {
    if (categoryName.trim()) {
      // Check if category already exists
      const existingCategory = categories.find(
        (category) => category.name === categoryName.trim()
      );

      if (existingCategory) {
        alert(
          `"${categoryName
            .trim()
            .toUpperCase()}" already exists. Either add a product in the 'Add Product' section, or rename the category.`
        );
      } else {
        // Category doesn't exist, create a new category
        addCategory({ name: categoryName.trim() });
        closePopup();
      }
    }
  };

  useEffect(() => {
    console.log("Categories Updated:", categories);
  }, [categories]);

  return (
    <div className="container">
      <div className="twoButtons">
        <button type="button" className="btn_1" onClick={handleCategory}>
          Add Category
        </button>
        <button type="button" className="btn_2" onClick={handleProduct}>
          Add Product
        </button>
      </div>

      <div className="contentsAtTop">
        <p>Products</p>
      </div>

      {showCategoryBox && (
        <div className="boxForCategory">
          <h3>Add Category</h3>

          <p>Category Name:</p>

          <input
            type="text"
            id="inputForCategory"
            placeholder="Enter Category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <div className="popButtons">
            <button type="button" id="cancel" onClick={closePopup}>
              Cancel
            </button>
            <button type="button" id="save" onClick={saveCategory}>
              Save
            </button>
          </div>
        </div>
      )}

      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className="category-box">
            <h4>{category.name.toUpperCase()}</h4>

            {category.products && category.products.length > 0 ? (
              category.products.map((product, idx) => (
                <div key={idx} className="detailsBox">
                  {/* <p>Product: {product.productName}</p> */}
                  {product.image && (
                    <img src={product.image} id="productImage" />
                  )}

                  <div>
                    <p id="pdname">{product.productName}</p>
                    <p id="pdprice"> ₹ {product.price}</p>
                    <p id="pddiscount">
                      {product.discount} {product.discountType}
                    </p>
                    <p id="pdbrand"> {product.brand}</p>

                    {/* variants */}
                    {/* <p> {product.size}</p> */}
                    {/* <p> {product.color}</p> */}
                  </div>
                </div>
              ))
            ) : (
              <p id="NoItems">No products in this category</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;

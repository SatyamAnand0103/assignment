import React, { createContext, useState } from "react";

// Create the ProductContext
export const ProductContext = createContext();

// Create the ProductProvider component
export const ProductProvider = ({ children }) => {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    category: "shoes", // Default category
    brand: "",
    price: 0,
    discount: 0,
    discountType: "%",
    image: null,
    size: "",
    color: "",
  });

  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("%");
  const [image, setImagetype] = useState(null);

  // Function to save product details
  const saveProductDetails = (newDetails) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      ...newDetails,
    }));
  };

  // Function to save price and discount information
  const savePriceInfo = (
    newPrice,
    newDiscount,
    newDiscountType,
    newImageType
  ) => {
    setPrice(newPrice);
    setDiscount(newDiscount);
    setDiscountType(newDiscountType);
    setImagetype(newImageType);
  };

  // Function to add a new category to the list
  // null arry added
  const addCategory = (newCategory) => {
    setCategories((prevCategories) => {
      const categoryIndex = prevCategories.findIndex(
        (cat) => cat.name === newCategory.name
      );

      if (categoryIndex !== -1) {
        const updatedCategories = [...prevCategories];

        // Check if the product already exists in the category
        const existingProductIndex = updatedCategories[
          categoryIndex
        ].products.findIndex(
          (product) => product.productName === newCategory.productName
        );

        if (existingProductIndex === -1) {
          // Add product only if it doesn't exist

          updatedCategories[categoryIndex].products.push({
            productName: newCategory.productName,
            brand: newCategory.brand,
            price: newCategory.price,
            discount: newCategory.discount,
            discountType: newCategory.discountType,
            image: newCategory.image,
            size: newCategory.size,
            color: newCategory.color,
          });
        }

        console.log("Updated categories this time:", updatedCategories); // Debugging line
        return updatedCategories;
      } else {
        // Create new category if it doesn’t exist and add the product
        return [
          ...prevCategories,
          {
            name: newCategory.name,
            products: [
              //   {
              //     productName: newCategory.productName,
              //     brand: newCategory.brand,
              //     price: newCategory.price,
              //     discount: newCategory.discount,
              //     discountType: newCategory.discountType,
              //   },
            ],
          },
        ];
      }
    });
  };

  return (
    <ProductContext.Provider
      value={{
        productDetails,
        saveProductDetails, // Function to update product details
        price,
        discount,
        discountType,
        image,
        savePriceInfo, // Expose savePriceInfo function
        // saveCategory, // Expose saveCategory function
        categories, // Expose categories to be used in other components
        addCategory, // Expose addCategory function to add categories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

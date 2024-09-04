import React, { useState, useEffect } from "react";
import { fetchProducts } from "./api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading products", error);
      }
    };

    loadProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = category
      ? products.filter((product) => product.category === category)
      : products;
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select
          className="border rounded-xl bg-white px-6 py-2"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-[340px] space-y-3 rounded-xl bg-white p-4 shadow-lg border-2"
          >
            <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between"></div>
              <img
                width={400}
                height={400}
                className="rounded-lg bg-black/40 object-cover"
                src={product.photoUrl}
                alt="card navigate ui"
              />
            </div>
            <div className="space-y-2 font-semibold">
              <h6 className="text-sm md:text-base lg:text-lg">
                {product.name}
              </h6>
              <p className="text-md font-semibold  md:text-sm">
                {product.description}
              </p>
              <p>Price: ${product.price}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-6 text-sm md:text-base">
              <button className="rounded-lg bg-[#49B2FF] px-2 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600">
                Brand: {product.brand}
              </button>
              <button className="rounded-lg bg-[#49B2FF] px-2 py-2 font-semibold text-white duration-300 hover:scale-95 hover:bg-gray-600">
                Category: {product.category}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

import React, { useState } from "react";
import { productCategories, products } from "../constants/products";

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("NEW");

  const filteredProducts =
    selectedCategory === "NEW"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="flex bg-black text-yellow-500 min-h-screen pt-10 px-20">
      {/* Sidebar */}
      <aside className="w-1/5 pl-10 flex flex-col gap-3 text-sm font-mono">
        {productCategories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat)}
            className={`bebas italic text-xl text-left hover:text-white ${
              selectedCategory === cat ? "text-white" : ""
            }`}
          >
            {cat}
          </button>
        ))}
        <div className="mt-10 flex flex-col gap-2 text-xs text-yellow-500">
          <a href="#">NEWSLETTER</a>
          <a href="#">SHIPPING POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
        </div>
      </aside>

      {/* Products Grid */}
      <main className="w-4/5 grid grid-cols-3 gap-12 px-10">
        {filteredProducts.map((product, index) => (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full hover:opacity-80 transition"
            />
            <p className="mt-2 text-xs">{product.title}</p>
            <p className="text-xs">{product.price}</p>
          </a>
        ))}
      </main>
    </section>
  );
};

export default Store;

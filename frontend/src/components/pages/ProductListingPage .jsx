import React from "react";

const products = [
  { id: 1, name: "Product 1", price: "$99", color: "bg-gray-100" },
  { id: 2, name: "Product 2", price: "$199", color: "bg-blue-100" },
  { id: 3, name: "Product 3", price: "$299", color: "bg-pink-100" },
  { id: 4, name: "Product 4", price: "$399", color: "bg-yellow-100" },
  { id: 5, name: "Product 5", price: "$499", color: "bg-green-100" },
  { id: 6, name: "Product 6", price: "$599", color: "bg-purple-100" },
];

const ProductListingPage = () => {
  return (
    <div className="bg-white min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`shadow-lg rounded-lg p-4 bg-gray-100 hover:scale-105 transition-transform`}
          >
            <img
              src={`https://via.placeholder.com/150?text=${product.name}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-lg text-gray-700">{product.price}</p>
            <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;

import React from "react";

const products = [
  { id: 1, name: "Wireless Earbuds, IPX8", price: "$89.00" },
  { id: 2, name: "AirPods Max", price: "$559.00" },
  { id: 3, name: "Bose BT Earphones", price: "$289.00" },
  { id: 4, name: "VIVEFOX Headphones", price: "$39.00" },
  { id: 5, name: "JBL TUNE 600BTNC", price: "$59.00" },
  { id: 6, name: "TAGRY Bluetooth", price: "$109.00" },
];

const ProductListingPage = () => {
  return (
    <div className="bg-white min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="shadow-lg rounded-lg p-4 bg-gray-100 hover:scale-105 transition-transform"
          >
            <img
              src={`https://via.placeholder.com/150?text=${product.name}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-lg text-gray-700">{product.price}</p>
            <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;

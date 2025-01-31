import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../products/ProductForm';

const DashboardPage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/product/all');
            if (response.data) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/product/delete/${id}`);
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-white min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>
            <ProductForm />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {products.map((product) => (
                    <div key={product._id} className="shadow-lg rounded-lg p-4 bg-gray-100">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                        <p className="text-lg text-gray-700">{product.price}</p>
                        <button onClick={() => handleDelete(product._id)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;

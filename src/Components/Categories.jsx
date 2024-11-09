import React, { useEffect, useState } from "react";

const Categories = ({ className }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxRetries = 3;

  const fetchCategories = async (retryCount = 0) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      if (retryCount < maxRetries) {
        // Await the retry to prevent multiple retries stacking up
        await fetchCategories(retryCount + 1);
      } else {
        console.error("Error fetching categories:", err);
        setError('Failed to load categories. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="mx-auto max-w-7xl w-full sm:w-1/4 lg:w-1/5 xl:w-1/6 p-4 bg-white rounded-lg shadow-lg absolute left-4 sm:ml-4 lg:ml-36 h-[calc(100vh-1rem)] m-2 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Store Categories</h2>
      {loading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="text-gray-600 hover:text-black cursor-pointer">{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;

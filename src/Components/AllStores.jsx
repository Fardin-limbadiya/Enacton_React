import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllStores = ({ cashbackEnabled, selectedLetter, className }) => {
  const [stores, setStores] = useState([]);
  const [storesLoading, setStoresLoading] = useState(false);
  const [storesError, setStoresError] = useState(null);
  const [sortOption, setSortOption] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const maxRetries = 3;
  const navigate = useNavigate();
  const fetchStores = async (retryCount = 0) => {
    setStoresLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/stores?cashback_enabled=${cashbackEnabled}&name_like=^${selectedLetter}`
      );
      if (!response.ok) throw new Error("Failed to fetch stores");
      const data = await response.json();
      setStores(data);
      setStoresError(null);
    } catch (err) {
      if (retryCount < maxRetries) {
        await fetchStores(retryCount + 1);
      } else {
        console.error("Error fetching stores:", err);
        setStoresError("Failed to load stores. Please try again later.");
      }
    } finally {
      setStoresLoading(false);
    }
  };

  const handleSave = (store) => {
    //localStorage
    const savedStores = JSON.parse(localStorage.getItem("savedStores")) || [];
    // new store to the saved stores
    savedStores.push(store);
    localStorage.setItem("savedStores", JSON.stringify(savedStores));
    // navigate to the Save page
    navigate("/save");
  };

  // Sorting function
  const sortStores = (stores) => {
    switch (sortOption) {
      case "name":
        return stores.sort((a, b) => a.name.localeCompare(b.name));
      case "popularity":
        return stores.sort((a, b) => b.clicks - a.clicks);
      case "cashback":
        return stores.sort((a, b) => b.cashback_amount - a.cashback_amount);
      case "status":
        return stores.sort((a, b) => a.status.localeCompare(b.status)); // String comparison for status
      default:
        return stores;
    }
  };

  useEffect(() => {
    if (selectedLetter) fetchStores();
  }, [cashbackEnabled, selectedLetter]);

  // Filter on search query
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedStores = sortStores(filteredStores);

  return (
    <div className={`my-[50px] ${className}`}>
      {/* Sorting Dropdown */}
      <div style={{ marginLeft: "850px" }} className="mb-4">
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border rounded">
          <option value="name">Sort by Name</option>
          <option value="popularity">Sort by Popularity</option>
          <option value="cashback">Sort by Cashback</option>
          <option value="Status">Sort by Status</option>
          <option value="Cats">Sort by Cats</option>
        </select>
        {/* Search Input */}
        <input style={{ marginTop: "5px", border: "2px solid black" }} type="text" placeholder="Search..." value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-gray-300 rounded-lg pr-10 pl-4 py-2 text-sm"
        />
      </div>

      {storesLoading ? (
        <p className="text-gray-500">Loading stores...</p>
      ) : storesError ? (
        <p className="text-red-500">{storesError}</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {sortedStores.map((store) => (
            <div key={store.id} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all">
              <div className="flex flex-col items-center space-y-2">
                <img src={store.logo} alt={`${store.name} logo`} className="w-40 h-18 object-cover rounded-lg" />
                <span className="text-lg font-medium text-gray-700">{store.name}</span>
                {store.cashback_enabled === 1 && (
                  <span className="text-sm text-green-600">Up to {store.cashback_percent}% cashback (${store.cashback_amount})</span>
                )}

                <div className="flex space-x-4">
                  <label className="bg-green-100 text-black px-3 py-1 rounded">Status <hr />{store.status}</label>
                  <label className="bg-green-100 text-black px-3 py-1 rounded justify-between">Cats <hr /> {store.cats}</label>
                </div>
              </div>
              <div className="mt-auto flex space-x-2 pt-4">
                <a href={store.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">Shop</a>
                <button
                  onClick={() => handleSave(store)}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Save</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStores;

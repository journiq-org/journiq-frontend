"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllTours } from "@/redux/slices/adminTourSlice";

const AllToursPage = () => {
  const dispatch = useAppDispatch();
  const { tours, loading, error } = useAppSelector((state) => state.adminTours);

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    destination: "",
    priceMin: "",
    priceMax: "",
    ratingMin: "",
    popular: "",
  });

  const handleFetchTours = () => {
    dispatch(fetchAllTours(filters));
  };

  useEffect(() => {
    handleFetchTours(); // fetch tours on page load
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Tours</h1>

      {/* Filters */}
      {/* <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Title"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Destination ID"
          value={filters.destination}
          onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={filters.priceMin}
          onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.priceMax}
          onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={filters.ratingMin}
          onChange={(e) => setFilters({ ...filters, ratingMin: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <select
          value={filters.popular}
          onChange={(e) => setFilters({ ...filters, popular: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">Sort By</option>
          <option value="true">Most Popular</option>
        </select>
        <button
          onClick={handleFetchTours}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </div> */}

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Tours Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Guide</th>
              <th className="p-2 border">Destination</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id} className="hover:bg-gray-50 border-b">
                <td className="p-2 border">{tour._id}</td>
                <td className="p-2 border">{tour.title}</td>
                <td className="p-2 border">{tour.category}</td>
                <td className="p-2 border">{tour.price}</td>
                <td className="p-2 border">{tour.rating}</td>
                <td className="p-2 border">{tour.guide.name}</td>
                <td className="p-2 border">{tour.destination.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllToursPage;

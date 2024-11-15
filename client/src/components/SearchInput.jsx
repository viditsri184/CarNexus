import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchInput({ setCars }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    // Debounce the search query
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500); // 500ms delay for debouncing

        return () => clearTimeout(timeoutId); // Clean up the timeout on component unmount
    }, [searchQuery]);

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form submission

        if (!searchQuery.trim()) {
            // If query is empty, show all cars
            const token = localStorage.getItem("token");
            const response = await axios.get('https://car-nexus-liart.vercel.app/api/cars/show', {
                headers: { Authorization: token },
            });
            setCars(response.data); // Update with all cars
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`https://car-nexus-liart.vercel.app/api/cars/search?query=${debouncedQuery}`, {
                headers: { Authorization: token },
            });

            setCars(response.data); // Update the cars state with search results
            setSearchQuery(""); // Clear the search box after submitting
        } catch (err) {
            console.log("Error fetching search results:", err);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value); // Update the query while typing
    };

    return (
        <div className='mt-4'>
            <form className="max-w-md mx-auto" onSubmit={handleSearch}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Cars...."
                        value={searchQuery}
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:text-black"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchInput;

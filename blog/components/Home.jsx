"use client"
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
const Home = () => {

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef("");


  const handleSearch = () => {
    const text = inputRef.current.value.toLowerCase();
    setSearchText(text);

    const results = post.filter(
      (item) =>
        item.title.toLowerCase().includes(text) ||
        item.field.toLowerCase().includes(text)
    );

    setFilteredPosts(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };


  return (
    <div>
      <h2 className='p-2 text-3xl font-bold'>Welcome to blog website</h2>
      <h2 className='p-2 text-2xl '>here you can see various field blog posts</h2>


      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 md:px-8 mt-6">

        <h2 className="text-3xl font-semibold">
          Latest Blog Posts
        </h2>

        {/* Search Bar */}
        <div className="flex w-full sm:w-auto gap-2">
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search posts..."
            className="w-full sm:w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Search
          </button>
        </div>
      </div>


    </div>
  )
}

export default Home
"use client";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link'
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const inputRef = useRef("");

  const API = process.env.NEXT_PUBLIC_API;


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("API:", API);

        const response = await fetch(`${API}/getall`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setPosts(result.data || []);
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API]);

  const handleSearch = () => {
    const text = inputRef.current.value.toLowerCase();
    setSearchText(text);

    const results = posts.filter((item) =>
      (item.title || "").toLowerCase().includes(text) ||
      (item.field || "").toLowerCase().includes(text)
    );

    setFilteredPosts(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // ✅ Decide what to display
  const displayPosts = searchText ? filteredPosts : posts;

  return (
    <div>
      <h2 className="p-2 text-3xl font-bold">
        Welcome to blog website
      </h2>
      <h2 className="p-2 text-2xl">
        here you can see various field blog posts
      </h2>

      {/* Header + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 md:px-8 mt-6">
        <h2 className="text-3xl font-semibold">
          Latest Blog Posts
        </h2>

        <div className="flex w-full sm:w-auto gap-2">
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search posts..."
            className="w-full sm:w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading posts...</p>
        ) : displayPosts.length > 0 ? (
          displayPosts.map((post, index) => (
            <div key={index} className="border p-3 rounded shadow">

              {post.image && (
                <img
                  src={`${API}/files/${post.image}`}
                  alt="post"
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <Link href={`/posts/${post._id}`}>
                <h2 className="font-bold text-2xl mt-2 cursor-pointer text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <h2 className="text-xl font-bold mt-2"> {post.category}</h2>
              <p className="text-xl mt-2">{post.posted_by}</p>
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
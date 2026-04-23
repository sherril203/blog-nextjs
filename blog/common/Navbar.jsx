import React from 'react'
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="bg-blue-600 text-white text-xl">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl">
          Blog
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-200">About</Link></li>
            <li><Link href="/posts" className="hover:text-blue-200">Posts</Link></li>
            <li><Link href="/contact" className="hover:text-blue-200">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar

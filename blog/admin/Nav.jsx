import React from 'react'
import Link from "next/link"

const Nav = () => {
  return (
    <div className="bg-blue-600 text-white text-xl">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/admin" className="font-bold text-2xl">
          admin
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li><Link href="/admin/dashboard" className="hover:text-blue-200">DashBoard</Link></li>
            <li><Link href="/admin/posts" className="hover:text-blue-200">Posts</Link></li>
            <li><Link href="/contact" className="hover:text-blue-200">Contact</Link></li>
          </ul>
        </nav>
        <div className=" flex gap-2">
          <button className='border-2 rounded p-3 hover:text-blue-200'><Link href="/login">Logout</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Nav

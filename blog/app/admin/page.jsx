import React from 'react'
import Nav from '../../admin/Nav'
import Dashboard from '../../admin/Dashboard'
export const metadata = {
  title: "admin dashboard",
  description: "dashboard for admin",
};
const page = () => {
  return (
    <div>
      <Nav/>
      <Dashboard/>
    </div>
  )
}

export default page

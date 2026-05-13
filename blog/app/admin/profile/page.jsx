import React from 'react'
import AdminProfile from '../../../admin/AdminProfile'
import Nav from '../../../admin/Nav'
export const metadata = {
  title: "profile",
  description: "profile of admin",
};
const page = () => {
  return (
    <div>
      <Nav/>
      <AdminProfile/>
    </div>
  )
}

export default page

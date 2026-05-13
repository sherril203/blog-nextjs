import React from 'react'
import Navbar from '../../common/Navbar'
import Home from '../../components/Home'

export const metadata = {
  title: "User Dashboard",
  description: "dashboard of user",
};
const page = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
    </div>
  )
}

export default page

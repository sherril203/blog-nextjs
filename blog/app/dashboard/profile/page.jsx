import React from 'react'
import UserProfile from '../../../components/UserProfile'
import Navbar from '../../../common/Navbar'

export const metadata = {
  title: "user profile",
  description: "post of blogs by user",
};
const page = () => {
  return (
    <div>
      <Navbar/>
      <UserProfile/>
    </div>
  )
}

export default page

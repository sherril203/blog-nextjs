import React from 'react'
import Posts from '../../components/Posts'
import Navbar from '../../common/Navbar'
import Footer from '../../common/Footer'

export const metadata = {
  title: "post",
  description: "post of blogs by user",
};

const page = () => {
  return (
    <div>
      <Navbar/>
      <Posts/>
      <Footer/>
    </div>
  )
}

export default page

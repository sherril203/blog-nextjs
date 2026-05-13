import React from 'react'
import About from '../../components/About'
import Navbar from '../../common/Navbar'
import Footer from '../../common/Footer'

export const metadata = {
  title: "About",
  description: "description of blog page",
};

const page = () => {
  return (
    <div>
        <Navbar/>
      <About/>
      <Footer/>
    </div>
  )
}

export default page

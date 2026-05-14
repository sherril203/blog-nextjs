import React from 'react'
import Navbar from '../../../common/Navbar'
import Footer from '../../../common/Footer'
import Userpost from '../../../components/Userpost';

export const metadata = {
  title: "post",
  description: "post of blogs by user",
};

const page = () => {
  return (
    <div>
      <Navbar/>
      <Userpost/>
      <Footer/>
    </div>
  )
}

export default page

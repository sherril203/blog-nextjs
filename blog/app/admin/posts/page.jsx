import React from 'react'
import Nav from '../../../admin/Nav'
import Post from '../../../admin/Post'

export const metadata = {
  title: "post",
  description: "post of blogs by user",
};
const page = () => {
  return (
    <div>
      <Nav/>
      <Post/>
    </div>
  )
}

export default page

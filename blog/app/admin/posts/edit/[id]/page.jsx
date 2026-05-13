import React from 'react'
import Nav from '../../../../../admin/Nav'
import Form from '../../../../../admin/Form'

export const metadata = {
  title: "post form",
  description: "upload your blog post",
};
const page = () => {
  return (
    <div>
      <Nav/>
      <Form/>
    </div>
  )
}

export default page

import React from 'react'
import Postform from '../../../components/Postform'

export const metadata = {
  title: "post form",
  description: "upload blog post",
};
const page = () => {
  return (
    <div>
      <Postform/>
    </div>
  )
}

export default page

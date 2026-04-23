"use client"
import React from 'react'
import { useState } from 'react'
const Contact = () => {
  return (
    <div>
        <h2 className='text-center text-2xl font-bold p-3'>Contact Us</h2>
        <form action="" className='bg-blue-200 shadow-lg py-3 px-3'>
            <div className='flex justify-center gap-3  p-2'>
                <label htmlFor="">Name</label>
                <input type="text"  className='p-2 border border-gray-200 rounded bg-white'/>
            </div>
             <div  className='flex justify-center gap-3'>
                <label htmlFor="">Email</label>
                <input type="email"  className='p-2 border border-gray-200 rounded bg-white'/>
            </div> <br />
             <div  className='flex justify-center gap-3'>
                <label htmlFor="">Message</label>
                <textarea name="" id="" cols="4" className='border border-gray-100 p-2 rounded bg-white'></textarea>
            </div> <br />
            <div className='flex justify-center gap-3'>
                <button className='bg-blue-600 text-white text-2xl rounded p-2 '>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Contact
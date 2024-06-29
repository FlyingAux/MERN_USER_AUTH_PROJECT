'use client'
import React from 'react'
import Link from 'next/link'
import './globals.css'

const page = () => {
  return (
    <>
      <h1 className='font-bold text-5xl'> Hello! , and Welcome </h1>
      <br/>
      <h1 className='font-semibold text-3xl'></h1>
      <div className='flex gap-3 items-center justify-start'>
      <Link className='border-black border-2 px-5 py-1 font-semibold w-fit' href='/login'>Login</Link>
      {/* <h2 className='font-bold text-2xl'>or</h2> */}
      <Link className='border-black border-2 px-5 py-1 font-semibold w-fit' href='/register'>register</Link>
      </div>
    </>
  )
}

export default page
import React from 'react'
import {IoLogoBitcoin} from 'react-icons/io'
import Link from 'next/link'
const Logo = () => {
  return (
    <>
     <Link href="/">
     <IoLogoBitcoin className='text-6xl cursor-pointer'/>
     </Link>
     
    </>
  )
}

export default Logo
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
const Search = () => {
    return (
        <div className='relative ml-6'>
            <input type="text" placeholder='Search' className='bg-gray-100' />
            <span className='absolute top-3 right-1'><AiOutlineSearch /></span>
        </div>
    )
}

export default Search
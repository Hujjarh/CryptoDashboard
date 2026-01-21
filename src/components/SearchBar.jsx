import React from 'react'

const SearchBar = ( { search, setSearch}) => {
  return (
    <div className='max-w-md mx-auto mb-8'>
      <input type="text"
             placeholder='Search coin...'
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className='w-full px-4 py-2 rounded-lg bg-gray-900
             border border-gray-700 focus:outline-none focus:border-blue-500' />
    </div>
  )
}

export default SearchBar

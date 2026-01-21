import React from 'react'
import CryptoCard from './CryptoCard'

const CryptoList = ({ coins }) => {
  return (
    <div>
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin}/>
      ))}
    </div>
  )
}

export default CryptoList

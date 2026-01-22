import React from 'react'
import CryptoCard from './CryptoCard'

const CryptoList = ({ coins, onSelect }) => {
  return (
    <div className="space-y-4">
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default CryptoList

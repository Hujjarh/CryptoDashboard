import React from 'react'

const CryptoCard = ({ coin, onSelect }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSelect) onSelect(coin)
  }

  return (
    <div
      className='flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl p-4 hover:bg-gray-800 transition cursor-pointer'
      onClick={() => onSelect && onSelect(coin)}
      onKeyDown={handleKeyDown}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
        <div className='flex items-center gap-4'>
            <img src={coin.image} alt={coin.name} className='w-10 h-10' />
            <div>
                <h2 className='font-semibold'>{coin.name}</h2>
                <p className='text-sm text-gray-400 uppercase'>{coin.symbol}</p>
            </div>
        </div>

        <div className='text-right'>
            <p className='font-bold'>
                ${coin.current_price.toLocaleString()}
            </p>
            <p className={`text-sm ${
                coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
            </p>

        </div>
      
    </div>
  )
}

export default CryptoCard

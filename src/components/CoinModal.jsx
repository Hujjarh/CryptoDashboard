import React, { useEffect, useState } from 'react'

const CoinModal = ({ coin, onClose }) => {
  const [visible, setVisible] = useState(false)
  const handleClose = () => {
    setVisible(false)
    // wait for animation to finish then call onClose
    setTimeout(() => onClose(), 200)
  }

  useEffect(() => {
    if (!coin) return

    setVisible(true)

    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin])

  if (!coin) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black ${visible ? 'bg-opacity-60' : 'bg-opacity-0'} transition-colors duration-200`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-lg bg-gray-900 border border-gray-800 rounded-xl p-6 text-white mx-4 transform transition-all duration-200 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${coin.name} details`}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <img src={coin.image} alt={coin.name} className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-semibold">{coin.name}</h3>
              <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
            </div>
          </div>

          <button
            className="text-gray-400 hover:text-white"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <div className="text-xs text-gray-400">Current Price</div>
            <div className="font-medium">${coin.current_price.toLocaleString()}</div>
          </div>

          <div>
            <div className="text-xs text-gray-400">Market Cap</div>
            <div className="font-medium">${coin.market_cap.toLocaleString()}</div>
          </div>

          <div>
            <div className="text-xs text-gray-400">24h Change</div>
            <div className={`${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'} font-medium`}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-400">Total Volume</div>
            <div className="font-medium">${coin.total_volume.toLocaleString()}</div>
          </div>
        </div>

        {coin.description && (
          <div className="mt-4 text-sm text-gray-300">
            {/* description may be a long HTML string from some APIs; guard if absent */}
            <div dangerouslySetInnerHTML={{ __html: coin.description }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CoinModal

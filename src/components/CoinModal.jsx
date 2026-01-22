import React, { useEffect } from 'react'
import { motion as Motion } from 'framer-motion'

const CoinModal = ({ coin, onClose }) => {
  useEffect(() => {
    if (!coin) return

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, coin])

  if (!coin) return null

  return (
    <Motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Motion.div
        className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-xl p-6 text-white mx-4"
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18 }}
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
            onClick={onClose}
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
      </Motion.div>
    </Motion.div>
  )
}

export default CoinModal

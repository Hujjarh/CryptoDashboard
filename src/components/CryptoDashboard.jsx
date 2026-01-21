import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import CryptoList from './CryptoList'
import CryptoCharts from './CryptoCharts'

const CryptoDashboard = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [chartData, setChartData] = useState([])


    useEffect(() => {
        const fetchCoins = async () => {
            try {
                setLoading(true)
                const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1")

                if(!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await res.json()
                setCoins(data)

                const chartRes = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${data[0].id}/market_chart?vs_currency=usd&days=7`
                );

                const chartJson = await chartRes.json()
                
                const formatted = chartJson.prices.map((item) => ({
                    date: new Date(item[0]).toLocaleDateString(), 
                    price: item[1]
                }))

                setChartData(formatted)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        } ;

        fetchCoins()

    }, [])

    const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))




  return (
    <div className='min-h-screen bg-gray-950 text-white pc-6 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Crypto Dashboard
      </h1>


      <SearchBar search={search} setSearch={setSearch}/>

      {loading && (
        <p className='text-center mt-10 text-gray-400'>Loading market data...</p>
      )}

      {error && (
        <p className='text-center mt-10 text-red-500'>{error}</p>
      )}


      {!loading && !error && (
       <>
       <CryptoCharts data={chartData}/>
        <CryptoList coins={filteredCoins}/>
        
       </>
      )}
    </div>
  )
}

export default CryptoDashboard

import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const CryptoCharts = ({ data }) => {
  return (
    <div className='w-full max-w-4xl mx-auto mt-8 bg-gray-900 border border-gray-800 rounded-xl p-4'>
      <h2 className='text-xl font-semibold mb-4'>Price Trend (Last 7 days)</h2>


      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="price" stroke='#60a5fa' strokeWidth={2}/>

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CryptoCharts

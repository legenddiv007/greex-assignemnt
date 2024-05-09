import React from 'react'
import CryptoList from '../components/CryptoList'
import CandleStickChart from '../components/CandlestickChart'
import { MyProvider } from '../context'
import styles from '@/app/styles/pages.module.css'


const page = async () => {

  return (
    <>
      <MyProvider>
        <div className={styles.mainContainer}>
          <CryptoList />
          <CandleStickChart />
        </div>
      </MyProvider>
    </>
  )
}

export default page

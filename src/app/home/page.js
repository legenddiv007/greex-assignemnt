import React from 'react'
import CryptoList from '../components/CryptoList'
import CandleStickChart from '../components/CandlestickChart'
import { MyProvider } from '../context'
import styles from '@/app/styles/pages.module.css'
import Navbar from '../components/Navbar'


const page = async () => {

  return (
    <>
      <MyProvider>
      <div className={styles.navbar}><Navbar/></div>
        <div className={styles.mainContainer}>
          <div>
            <CryptoList />
          </div>
          <div className={styles.chart}>
            <CandleStickChart />
          </div>
        </div>
      </MyProvider>
    </>
  )
}

export default page

import React from 'react'
import CryptoList from './components/CryptoList'
import CandleStickChart from './components/CandlestickChart';
import styles from '@/app/styles/pages.module.css'
import { MyProvider } from './context';

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

import React from 'react';
import CryptoList from '../components/CryptoList';
import dynamic from 'next/dynamic';
import { MyProvider } from '../context';
import styles from '@/app/styles/pages.module.css';
import Navbar from '../components/Navbar';

const DynamicCandleStickChart = dynamic(() => import('../components/CandlestickChart'), {
  ssr: false
});

const Page = () => {
  return (
    <>
      <MyProvider>
        <div className={styles.navbar}><Navbar/></div>
        <div className={styles.mainContainer}>
          <div>
            <CryptoList />
          </div>
          <div className={styles.chart}>
            <DynamicCandleStickChart />
          </div>
        </div>
      </MyProvider>
    </>
  );
};

export default Page;

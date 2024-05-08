import React from 'react'
import styles from "@/app/styles/cryptolist.module.css"
import CoinCard from './CoinCard';
const CryptoList = async () => {

    const url = 'https://coinranking1.p.rapidapi.com/coins';
    var coindata;

    const options = {
        method: 'GET',

        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            'tiers[0]': '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
            offset: '0'
        },
        headers: {
            'X-RapidAPI-Key': '74972a32d8msh5ac31f15f5cbe13p1ec771jsn9f081d9e603b',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json()
        coindata = data?.data?.coins;
    } catch (error) {
        console.log(error);
    }

    return (

        <>
            <div className={styles.list}>
                {
                    coindata?.map((coin)=>{
                       return  <CoinCard data={coin} key={coin?.uuid} />
                    })
                }
            </div>
        </>
    )
}

export default CryptoList

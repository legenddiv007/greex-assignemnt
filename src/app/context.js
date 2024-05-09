"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [selectedCoin, setSelectedCoin] = useState({});
  const [coindata, setCoindata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://coinranking1.p.rapidapi.com/coins';
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
        const data = await res.json();
        const coins = data?.data?.coins || [];
        setCoindata(coins);
        if (coins.length > 0) {
          setSelectedCoin(coins[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); 

  return (
    <MyContext.Provider value={{ selectedCoin, setSelectedCoin, coindata }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);


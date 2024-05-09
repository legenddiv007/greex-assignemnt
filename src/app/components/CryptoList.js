"use client"
import React, { useState, useEffect } from 'react';
import styles from "@/app/styles/cryptolist.module.css";
import CoinCard from './CoinCard';
import { useMyContext } from '../context';

const CryptoList = () => {
    const { selectedCoin, setSelectedCoin, coindata } = useMyContext();

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCoins, setFilteredCoins] = useState([]);

    useEffect(() => {
        setFilteredCoins(coindata);
    }, [coindata]);

    useEffect(() => {
        if (coindata.length > 0) {
            setSelectedCoin(coindata[0]);
        }
    }, [coindata, setSelectedCoin]);

    const handleCardClick = (coin) => {
        setSelectedCoin(coin);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        filterCoins(value);
    };

    const filterCoins = (searchTerm) => {
        const filtered = coindata.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCoins(filtered);
    };

    return (
        <>
            <div className={styles.list}>
                <div >
                    <input
                        className={styles.searchbar}
                        type="text"
                        placeholder="Search for a coin..."
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </div>
                {
                    filteredCoins.map((coin) => (
                        <CoinCard
                            key={coin.uuid}
                            data={coin}
                            isSelected={coin === selectedCoin}
                            onClick={() => handleCardClick(coin)}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default CryptoList;

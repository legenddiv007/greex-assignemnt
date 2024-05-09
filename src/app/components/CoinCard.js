import React from 'react';
import styles from "@/app/styles/coincard.module.css";
import Image from 'next/image';

const CoinCard = ({ data, isSelected, onClick }) => {
    return (
        <div
            className={`${styles.coinCard} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <div className={styles.leftSide}>
                <Image src={data?.iconUrl} alt={data?.symbol} width={30} height={30} />
                <div className={styles.coinName}>
                    {data?.name}
                </div>
            </div>

            <div
                className={styles.rightSide}
                style={{ color: data?.change?.startsWith('-') ? '#F44336' : '#4CAF50' }}
            >
                {data?.change} %
            </div>
        </div>
    );
};

export default CoinCard;

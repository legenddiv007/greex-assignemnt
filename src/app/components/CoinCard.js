import React from 'react'
import styles from '@/app/styles/coincard.module.css'
import Image from 'next/image'

const CoinCard = ({ data }) => {
    return (
        <>
            <div className={styles.coinCard}>
                <div className={styles.leftSide}>
                        <Image src={data?.iconUrl} alt={data?.symbol} width={40} height={40} />
                    <div className={styles.coinName}>
                        {data?.name}
                    </div>
                </div>

                <div className={styles.rightSide} style={{ color: data?.change?.startsWith('-') ? 'red' : 'green' }}>
                    {data?.change}
                </div>
            </div>
        </>
    )
}

export default CoinCard

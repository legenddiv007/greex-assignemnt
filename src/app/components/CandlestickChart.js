"use client"
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from '@/app/styles/chart.module.css';
import { useMyContext } from '../context';

const CandleStickChart = () => {
    const { selectedCoin } = useMyContext();
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(selectedCoin).length > 0) {
                const url = `https://coinranking1.p.rapidapi.com/coin/${selectedCoin?.uuid}/ohlc`;
                const options = {
                    method: 'GET',
                    params: {
                        referenceCurrencyUuid: 'yhjMzLPhuIDl',
                        interval: 'month',
                        limit: '100'
                    },
                    headers: {
                        'X-RapidAPI-Key': '74972a32d8msh5ac31f15f5cbe13p1ec771jsn9f081d9e603b',
                        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                    }
                };

                try {
                    const res = await fetch(url, options);
                    const data = await res.json();
                    if (Array.isArray(data.data.ohlc)) {
                        const transformedArray = data?.data?.ohlc?.map(obj => ({
                            x: new Date(obj.startingAt * 1000),
                            y: [parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close)]
                        }));
                        setTransformedData(transformedArray);
                    }

                } catch (error) {
                    console.log(error);
                }
            };
        }

        fetchData();
    }, [selectedCoin]);

    const options = {
        chart: {
            type: 'candlestick',
            background: '#2b2b2b',
            foreColor: '#ccc',
            height: '100%',
            width:'100%'
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: '#ccc'
                }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    colors: '#ccc'
                }
            }
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#4CAF50',
                    downward: '#F44336',
                },
            },
        },
        tooltip: {
            theme: 'dark',
        },
        menu: {
            download: false,
            theme: 'dark',
        },
    };

    return (
        <div className={styles.chart} >
            <ReactApexChart options={options} series={[{ data: transformedData }]} type="candlestick" style={{ height: '100vh' }} />
        </div>
    );
};

export default CandleStickChart;

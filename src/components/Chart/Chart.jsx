import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length !==0
            ?(
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data:dailyData.map(({confirmed}) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill:true
                        },{
                            data:dailyData.map(({deaths}) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill:true
                        }],
                    }}
                />): null
            );

    const barChart = (
        confirmed 
        ? (
            <Bar 
                data = {{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [ 
                            'rgba(255, 203, 5, 0.8)',
                            'rgba(0, 230, 64, 0.9)',
                            'rgba(207, 0, 15, 0.9)'
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display:true, text: `Current state in ${country}`}
                }}
            />
            ) : null
    )

    return (
        <div className= {styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart
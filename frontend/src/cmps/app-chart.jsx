import React from 'react'  
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'  
import { Doughnut } from 'react-chartjs-2'  

ChartJS.register(ArcElement, Tooltip, Legend)  


export function MyChart() {

    const data = {
        labels: ['Puki', 'Muki', 'Shuki'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }  
      

  return <div style={{width: "50%", margin: "auto"}}><Doughnut data={data} /></div>  
}

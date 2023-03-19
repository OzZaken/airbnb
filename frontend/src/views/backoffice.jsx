import React, { useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service.js'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { loadStays } from '../store/actions/stay.action.js'

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function StayDashboard() {
    const stays = useSelector(
        state => state.stayModule.stays || stayService.loadStaysFromLocalStorage()
    )
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!stays) dispatch(loadStays())
        else stayService.setStaysToLocalStorage(stays)
    }, [dispatch, stays])

    function initData() {
        const avgPriceByLabel = stayService.avgPriceByLabels(stays)
        const dataPriceByLabel = {
            labels: avgPriceByLabel.map((label) => {
                return Object.keys(label)[0]
            }),
            datasets: [
                {
                    label: 'Price By Label',
                    data: avgPriceByLabel.map((label) => {
                        return Object.values(label)[0]
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }

        const percentageLabelsInStock = stayService.avgLabelsByStock(stays)
        const labels = percentageLabelsInStock.map((label) => {
            return Object.keys(label)[0]
        })

        const dataLabelInStock = {
            labels,
            datasets: [
                {
                    label: 'Stay Label',
                    data: percentageLabelsInStock.map((label) => {
                        return Object.values(label)[0]
                    }),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }

        return { dataPriceByLabel, dataLabelInStock }
    }

    const { dataPriceByLabel, dataLabelInStock } = stays ? initData() : { dataPriceByLabel: null, dataLabelInStock: null }

    const onBack = () => {
        navigate('/')
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    }

    if (!stays) return <></>

    return (
        <section className='stay-dashboard flex column justify-center align-center'>
            <Button className='btn-back' variant="outlined" onClick={onBack}>Back</Button>
            <div className='chart' style={{ width: "50%" }}>
                <h3>Average prices by stay type</h3>
                <Doughnut data={dataPriceByLabel} />
            </div>
            <div className='chart' style={{ width: "50%" }}>
                <h3>Average prices by stay label</h3>
                <Bar options={options} data={dataLabelInStock} />
            </div>
        </section>
    )

}
import React from 'react'
import PropTypes from 'prop-types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import {getRandomColor} from '../services/util.service'

ChartJS.register(ArcElement, Tooltip, Legend)

const ChartApp = ({ data, labels, title }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: labels.map(() => getRandomColor()),
        borderColor: labels.map(() => getRandomColor()),
        borderWidth: 1,
      },
    ],
  }

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <Doughnut data={chartData} />
    </div>
  )
}

ChartApp.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default ChartApp
import { Chart, LineElement, PointElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Radar } from 'react-chartjs-2'

Chart.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale)

const options = {
    elements: {
        point: {
            radius: 0,
        },
        line: {
            borderWidth: 4,
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        r: {
            ticks: {
                display: false,
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                circular: true,
            },
            angleLines: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
        }
    },
}

export function FeaturesChart({ features }) {
    const data = {
        labels: [
            'Danceable',
            'Energetic',
            'Speechful',
            'Acoustic',
            'Instrumental',
            'Lively',
            'Valence'
        ],
        datasets: [
            {
                data: features,
                borderColor: 'rgba(0, 240, 126, 1)',
            }
        ],
    }

    return (
        <Radar data={data} options={options} />
    )
}

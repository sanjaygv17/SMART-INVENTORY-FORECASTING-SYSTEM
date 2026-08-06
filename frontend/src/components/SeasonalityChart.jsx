import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function SeasonalityChart({

    data,

    type

}) {

    const chartData = {

        labels:

            type === "month"

                ? data.map(item => item.month)

                : data.map(item => `Week ${item.week}`),

        datasets: [

            {

                label: "Units Sold",

                data: data.map(item => item.units),

                borderColor: "#2563eb",

                backgroundColor: "#93c5fd",

                tension: 0.4,

                fill: false

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                position: "top"

            }

        }

    };

    return (

        <Line

            data={chartData}

            options={options}

        />

    );

}

export default SeasonalityChart;
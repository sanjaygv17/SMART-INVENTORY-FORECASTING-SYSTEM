import { useEffect, useState } from "react";
import client from "../api/client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function SalesChart() {

    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSales = async () => {

        try {

            const response = await client.get(
                "/charts/weekly-sales"
            );

            setSalesData(response.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchSales();

    }, []);

    if (loading) {

        return (

            <div className="rounded-xl bg-white p-6 shadow-md">

                <h2 className="text-xl font-semibold">

                    Loading Chart...

                </h2>

            </div>

        );

    }

    return (

        <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-xl font-semibold">

                Weekly Sales

            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={salesData}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="week"/>

                    <YAxis/>

                    <Tooltip/>

                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#2563eb"
                        strokeWidth={4}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default SalesChart;
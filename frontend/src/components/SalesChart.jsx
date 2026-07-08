import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const salesData = [
    { week: "Week 1", sales: 120 },
    { week: "Week 2", sales: 180 },
    { week: "Week 3", sales: 160 },
    { week: "Week 4", sales: 220 },
    { week: "Week 5", sales: 260 }
];

function SalesChart() {

    return (

        <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-xl font-semibold">

                Weekly Sales

            </h2>

            <ResponsiveContainer width="100%" height={300}>

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
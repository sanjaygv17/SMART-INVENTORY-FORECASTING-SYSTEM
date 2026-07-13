import { useEffect, useState } from "react";
import client from "../api/client";

import KpiCard from "../components/KpiCard";
import SalesChart from "../components/SalesChart";
import RecentTransactions from "../components/RecentTransactions";

import {
    MdInventory,
    MdCurrencyRupee,
    MdReceiptLong,
    MdWarning,
    MdDashboard
} from "react-icons/md";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalRevenue: 0,
        totalTransactions: 0,
        lowStockItems: 0
    });

    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {

        try {

            const response = await client.get("/dashboard-data");

            setDashboardData(response.data.data);

        } catch (error) {

            console.error("Dashboard Error:", error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    const kpiCards = [

        {
            title: "Products",
            value: dashboardData.totalProducts,
            color: "text-blue-600",
            icon: MdInventory,
        },

        {
            title: "Revenue",
            value: `₹${dashboardData.totalRevenue}`,
            color: "text-green-600",
            icon: MdCurrencyRupee,
        },

        {
            title: "Transactions",
            value: dashboardData.totalTransactions,
            color: "text-purple-600",
            icon: MdReceiptLong,
        },

        {
            title: "Low Stock",
            value: dashboardData.lowStockItems,
            color: "text-red-600",
            icon: MdWarning,
        }

    ];

    if (loading) {

        return (

            <div className="flex h-screen items-center justify-center">

                <h2 className="text-2xl font-semibold">

                    Loading Dashboard...

                </h2>

            </div>

        );

    }

    return (

        <div className="space-y-10">

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <div className="flex items-center gap-3">

                        <MdDashboard
                            size={36}
                            className="text-blue-600"
                        />

                        <h1 className="text-4xl font-bold text-slate-800">

                             Dashboard

                        </h1>

                    </div>

                    

                </div>

                <div className="rounded-xl bg-white px-5 py-3 shadow">

                    <p className="text-sm text-gray-500">

                        Today's Date

                    </p>

                    <h2 className="text-lg font-semibold text-slate-700">

                        {new Date().toLocaleDateString()}

                    </h2>

                </div>

            </div>

            {/* KPI Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {kpiCards.map((card) => (

                    <KpiCard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        color={card.color}
                        icon={card.icon}
                    />

                ))}

            </div>

            {/* Sales Chart */}

            <SalesChart />

            {/* Recent Transactions */}

            <RecentTransactions />

        </div>

    );

}

export default Dashboard;
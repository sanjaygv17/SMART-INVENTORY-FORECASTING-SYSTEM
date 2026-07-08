import KpiCard from "../components/KpiCard";
import SalesChart from "../components/SalesChart";
import RecentTransactions from "../components/RecentTransactions";
import {
    MdInventory,
    MdCurrencyRupee,
    MdReceiptLong,
    MdWarning
} from "react-icons/md";
import { MdDashboard } from "react-icons/md";



function Dashboard() {

     const dashboardData = {
        totalProducts: 45,
        totalRevenue: 8800,
        totalTransactions: 16,
        lowStockItems: 2
    };

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
    },
];


   

    return (

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


    <SalesChart />
    <RecentTransactions/>

</div>

    );

}

export default Dashboard;
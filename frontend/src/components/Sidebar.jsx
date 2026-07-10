import { NavLink } from "react-router-dom";
import { MdAutoGraph } from "react-icons/md";

import {
    MdDashboard,
    MdInventory,
    MdReceiptLong,
    MdWarehouse,
    MdWarning,
    MdAnalytics
} from "react-icons/md";

const menuItems = [
    {
        name: "Dashboard",
        path: "/",
        icon: MdDashboard,
    },
    {
        name: "Products",
        path: "/products",
        icon: MdInventory,
    },
    {
        name: "Transactions",
        path: "/transactions",
        icon: MdReceiptLong,
    },
    {
        name: "Inventory",
        path: "/inventory",
        icon: MdWarehouse,
    },
    {
        name: "Alerts",
        path: "/alerts",
        icon: MdWarning,
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: MdAnalytics,
    },
    {
        name: "Prediction",
        icon: MdAutoGraph,
        path: "/product-prediction"
    }
];

function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-slate-900 text-white">

            <div className="border-b border-slate-700 p-6">

                <h2 className="text-2xl font-bold">
                    Smart Inventory
                </h2>

                <p className="text-sm text-slate-400">
                    Management System
                </p>

            </div>

            <nav className="mt-6 px-3">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                                }`
                            }
                        >

                            <Icon size={22} />

                            <span>{item.name}</span>

                        </NavLink>

                    );

                })}

            </nav>

        </aside>
    );
}

export default Sidebar;
import { NavLink } from "react-router-dom";

const menuItems = [
    {
        name: "Dashboard",
        path: "/",
        icon: "📊",
    },
    {
        name: "Products",
        path: "/products",
        icon: "📦",
    },
    {
        name: "Transactions",
        path: "/transactions",
        icon: "💳",
    },
    {
        name: "Inventory",
        path: "/inventory",
        icon: "📂",
    },
    {
        name: "Alerts",
        path: "/alerts",
        icon: "🚨",
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: "📈",
    },
];

function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-slate-900 text-white">

            {/* Logo */}
            <div className="border-b border-slate-700 p-6">
                <h2 className="text-2xl font-bold">
                    Smart Inventory
                </h2>
                <p className="text-sm text-slate-400">
                    Management System
                </p>
            </div>

            {/* Navigation */}
            <nav className="mt-6 px-3">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-slate-700"
                            }`
                        }
                    >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}

            </nav>
        </aside>
    );
}

export default Sidebar;